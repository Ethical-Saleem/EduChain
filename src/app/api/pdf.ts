import { NextApiHandler } from "next";
import puppeteer from "puppeteer";

const PDFHandler: NextApiHandler = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://localhost:3000/resultChecker/result-download");
  await page.emulateMediaType("screen");

  const pdfBuffer = await page.pdf({ format: "A4" });

  res.send(pdfBuffer);

  await browser.close();
}

export default PDFHandler;
