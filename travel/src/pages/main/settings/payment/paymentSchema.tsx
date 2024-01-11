import * as Yup from 'yup';

export const PaymentSchema = Yup.object().shape({
  type: Yup.string()
    .min(2, 'Ən azı 2 hərf olmalıdı!')
    .max(20, 'Maksimum 20 hərf ola bilər!')
    .required('Mütləqdir!')
});