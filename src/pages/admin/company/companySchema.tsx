import * as Yup from 'yup';

export const CompanySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Ən azı 2 hərf olmalıdı!')
    .max(20, 'Maksimum 20 hərf ola bilər!')
    .required('Mütləqdir!'),
  phoneNumber: Yup.string().required('Mütləqdir!'),
  email: Yup.string().email('Invalid email').required('Mütləqdir!'),
});