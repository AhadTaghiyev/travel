interface IQrImageType {
    qrImage : string
}

const qrWrapperStyle = {
    padding: '20px 10px',
    border: '1px solid #EBEDF0',
}

const qrImageStyle = {
    width: '100%',
}

export default function Index({qrImage} : IQrImageType) {
  return (
    <div style={qrWrapperStyle}>
        <img src={qrImage} style={qrImageStyle}/>
    </div>
  )
}



