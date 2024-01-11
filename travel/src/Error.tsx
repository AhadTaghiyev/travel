import { useNavigate } from "react-router-dom"

const errorPageStyle = {
    width: '100%',
    height: '100vh',
    backgroundColor: '#24272B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const errorMessageWrapper={
    width: '30%',
    height: '30vh',
    backgroundColor: 'FFFFFB',
    color: 'white'
}

export default function Error() {

    const navigate = useNavigate();

  return (
    <div style={errorPageStyle}>
        <div style={errorMessageWrapper}>
            <h1>404</h1>
            <button onClick={()=>navigate(-1)}>Go back</button>
        </div>
    </div>
  )
}
