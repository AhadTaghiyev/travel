
// @ts-nocheck
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavigationItem from '../../../components/pages/home/navigationItem';
import {navigationItems} from './navigationItems';
import AlertTable, {IAlertTableModel, IAlertTableHeadingsModel, IAlertTableHeading} from '../../../components/pages/alertTable';
import {AiFillFilePdf} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { apiService } from '../../../server/apiServer';
import { useTranslation } from 'react-i18next';

const title : IAlertTableHeading = {
    text: 'Check Alerts',
    icon: AiFillFilePdf,
    iconColor: 'red'
}

const tableHeadings : IAlertTableHeadingsModel[] = [
    {
        fieldName: 'Due date',
        propertyName: 'date',
    },
    {
        fieldName: 'Beneficery',
        propertyName: 'beneficery',
    },
    {
        fieldName: 'Amount',
        propertyName: 'amount',
    },
]

const headings : IAlertTableModel={
    heading: title,
    tableHeadings: tableHeadings,
    rows: [
        {
            date: '28/11/2001',
            amount: 100,
            beneficery: 'Mum'
        },
        {
            date: '28/11/2001'
        },
    ],
    link: '',
}

export default function index() {
    const { t } = useTranslation();
    const [moneyTracking, setMoneyTracking] = useState<IAlertTableModel>({});

    useEffect(()=> {
        async function fetcMoneyTracking() {
            try{
                const res = await apiService.get('Report/GetMoneyTracking');
                if (res && res.data) {
                    const newMoneyTracking : IAlertTableModel = {
                        heading: {text: 'Vəsaitlərin izlənməsi'},
                        link: '/panel/massIncome',
                        rows: res.data,
                        tableHeadings: []
                    }

                    for(const key in res.data[0]){
                        newMoneyTracking.tableHeadings.push({
                            fieldName: key,
                            propertyName: key
                        });
                    }

                    setMoneyTracking(newMoneyTracking);
                }
            }
            catch (error) {
                console.error("Error fetching current user:", error);
            }
        }
    
        fetcMoneyTracking();
    
    }, [])
    
  
  return (
    <Container maxWidth='xl'>
        <Grid container spacing={2}>
            {
                navigationItems.map((item, key) => (
                    <Grid key={key} item lg={3} md={3} sm={4}>
                        <NavigationItem 
                            text={item.text}
                            path={item.path}
                            color={item.color}
                            Icon={item.Icon}
                        />
                    </Grid>
                ))
            }
            <Grid item xs={6}>
                <AlertTable heading={moneyTracking.heading} tableHeadings={moneyTracking.tableHeadings} rows={moneyTracking.rows} link={moneyTracking.link}/>
            </Grid>
        </Grid>
    </Container>
  )
}
