import { Grid } from "@mui/material"

interface IClientType{
    client: string,
    date: string,
    ticketNumber: number,
    airway: string,
    passengerCount: number,
    amount: string
}

const tableWrapper = {
    borderRadius: '2px',
    border: '1px solid #EBEDF0',
    boxShadow:' 0px 16px 40px -12px rgba(171, 186, 201, 0.20)',
    marginBottom: '25px'
}

const footerStyle={
    background: '#F8F9FA',
    padding: '10px 4px'
}

const headerItemStyle={
    fontWeight: '600',
    fontSize:"16px"

    
}

export default function Index({client, date, ticketNumber, airway, passengerCount, amount} : IClientType) {
  return (
    <div style={tableWrapper}>
        <Grid container sx={{borderBottom: '1px solid #EBEDF0'}}>
            <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p data-id={passengerCount} style={headerItemStyle}>Müştəri</p>
            </Grid>
            <Grid item xs={1} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p style={headerItemStyle}>Tarix</p>
            </Grid>
            <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p style={headerItemStyle}>Bilet nömrəsi</p>
            </Grid>
            <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p style={headerItemStyle}>Reys və hava yolları</p>
            </Grid>
            {/* <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p style={headerItemStyle}>Sərnişin sayı</p>
            </Grid> */}
            <Grid item xs={1} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p style={headerItemStyle}>Məbləğ</p>
            </Grid>
            <Grid item xs={1} sx={{py: 2,px:1}}>
                <p style={headerItemStyle}>Ödəniş et</p>
            </Grid>
        </Grid>
        <Grid container sx={{borderBottom: '1px solid #EBEDF0'}}>
           
            <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p>{client}</p>
            </Grid>
            <Grid item xs={1} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p>{date}</p>
            </Grid>
            <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p>{ticketNumber}</p>
            </Grid>
            <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p>{airway}</p>
            </Grid>
            {/* <Grid item xs={2} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p>{passengerCount}</p>
            </Grid> */}
            <Grid item xs={1} sx={{borderRight: '1px solid #EBEDF0', py: 2, px: 1}}>
                <p>{amount}</p>
            </Grid>
            <Grid item xs={1} sx={{py: 2, px: 1}}>
                <p>Ödəniş et</p>
            </Grid>
        </Grid>
        <footer style={footerStyle}>
                <span style={{fontWeight: '600', marginRight: '116px'}}>Yekun</span>
                <span>1,000 AZN</span>
        </footer>
    </div>
  )
}
