const NodeRSA = require('node-rsa')
const { KEYUTIL, KJUR, hextob64, b64tohex } = require('jsrsasign')

export default class CustomRsa {
  constructor ({ opayPublicKey, merchantPrivateKey }) {
    this.data = null
    this.opayPublicKey = opayPublicKey
    this.merchantPrivateKey = merchantPrivateKey
  }

  encrypt (data, timestamp) {
    this.data = data || this.data
    console.log(this.data)
    console.log(timestamp)
    if (!this.data || !timestamp) return 'error'

    const rsa = new NodeRSA({ b: 1024 })
    rsa.setOptions({ encryptionScheme: { scheme: 'pkcs1' } })
    rsa.importKey(this.opayPublicKey, 'pkcs8-public-pem')
    const encrypted = rsa.encrypt(JSON.stringify(this._traverseData(data)), 'base64')
    console.log(encrypted)
    const encryptData = {
      paramContent: encrypted,
      sign: this._setSign(encrypted + timestamp)
    }
    return encryptData
  }

  decrypt (data) {
    const rsa = new NodeRSA(this.merchantPrivateKey)
    rsa.setOptions({ encryptionScheme: { scheme: 'pkcs1' } })
    const decrypted = rsa.decrypt(data.data, 'utf8')
    const responseData = JSON.parse(decrypted)
    const { sign } = data
    delete data.sign
    return {
      verify: this._verifySign(sign, this._traverseData(data)),
      data: responseData
    }
  }

  _setSign (inputString = '{}') {
    var key = `-----BEGIN PRIVATE KEY-----
    ${this.merchantPrivateKey}
    -----END PRIVATE KEY-----`
    console.log(key)
    const rsa = KEYUTIL.getKey(key)
    const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
    sig.init(rsa)
    sig.updateString(inputString)
    return hextob64(sig.sign())
  }

  _verifySign (sign, data) {
    const signatureVf = new KJUR.crypto.Signature({ alg: 'SHA256withRSA', prvkeypem: this.opayPublicKey })
    let mapSlicing = ''
    for (const k in data) {
      if (mapSlicing) {
        mapSlicing += '&'
      }
      mapSlicing += `${k}=${data[k]}`
    }
    signatureVf.updateString(mapSlicing)
    return signatureVf.verify(b64tohex(sign))
  }

  _getDataTypes (data) {
    return Object.prototype.toString.call(data)
  }

  _traverseData (data) {
    console.log(data)
    let r = null
    console.log(this._getDataTypes(data))
    switch (this._getDataTypes(data)) {
      case '[Object Object]': {
        r = {}
        const keyarr = Object.keys(data).sort()
        keyarr.forEach(key => {
          const val = data[key]
          r[key] = this._traverseData(val)
        })
      }
        break
      case '[Object Array]':
        data.sort().forEach(item => {
          r.push(this._traverseData(item))
        })
        break
      default:
        r = data
    }
    return r
  }
}
