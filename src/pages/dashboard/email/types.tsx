export interface IEmailModel{
    attachments: File[] | null,
    subject : string | null
    body : string | null
    toEmail : string | null
}