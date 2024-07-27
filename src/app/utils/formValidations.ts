import * as Yup from "yup";

export const passwordResetValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  code: Yup.string().required('Code is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('You must provide a new password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm password is required')
});

export const tokenPasswordResetValdiationSchema = Yup.object().shape({
  token: Yup.string().required(),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('You must provide a new password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm password is required')
});

export const changePasswordValidationSchema = Yup.object().shape({
  userId: Yup.string().notRequired(),
  currentPassword: Yup.string().required('This field is required is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('You must provide a new password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm password is required')
});

export const createSchoolValidationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required is required'),
  address: Yup.string().required('This field is required is required'),
  city: Yup.string().required('This field is required is required'),
  region: Yup.string().required('This field is required is required'),
  postalCode: Yup.string().notRequired(),
  contactName: Yup.string().notRequired(),
  country: Yup.string().required('This field is required is required'),
  telephone: Yup.string().required('This field is required is required'),
  email: Yup.string().required('This field is required is required'),
  dateFounded: Yup.date().nullable().required('This field is required is required'),
  logoUrl: Yup.mixed().required('This field is required is required'),
});

export const createUserValidationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required is required'),
  email: Yup.string().email('Invalid email address').required('This field is required'),
  telephone: Yup.string().required('This field is required is required'),
  schoolId: Yup.number().notRequired(),
  isNewSuper: Yup.boolean().notRequired(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('You must provide a new password'),
});

export const changePasswordValidationSchemaOmit = changePasswordValidationSchema.omit(['userId']);

export const createSchoolValidationSchemaOmit = createSchoolValidationSchema.omit(['logoUrl']);

export const createUserValidationSchemaOmit = createUserValidationSchema.omit(['schoolId', 'isNewSuper']);
