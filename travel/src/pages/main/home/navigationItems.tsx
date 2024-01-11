import {INavigationItemType} from '../../../components/pages/home/navigationItem/types';

// icons
import {MdOutlineAirplaneTicket} from 'react-icons/md';
import {HiDownload} from 'react-icons/hi';
import {HiOutlineArrowPathRoundedSquare} from 'react-icons/hi2';
import {FaArrowsLeftRightToLine, FaMoneyBillWave, FaFileImport} from 'react-icons/fa6';
import {BsArrowDownUp, BsCalculator} from 'react-icons/bs';
import {LuDivideCircle} from 'react-icons/lu';
import {PiWalletLight, PiHandshake} from 'react-icons/pi';
import {AiOutlineFolderOpen} from 'react-icons/ai';

export const navigationItems : INavigationItemType[] = [
    {
        text: 'Yeni aviabilet',
        path: '/panel/aviabiletsale/new',
        color: '#655F59',
        Icon: MdOutlineAirplaneTicket,
        quantity: 1
    },
    {
        text: 'Mədaxil',
        path: '/',
        color: '#B1B2A1',
        Icon: HiDownload,
        quantity: 1
    },
    {
        text: 'Təsisçidən təsisçiyə',
        path: '/',
        color: '#C5A253',
        Icon: FaArrowsLeftRightToLine
    },
    {
        text: 'Vəsait transferi',
        path: '/',
        color: '#6E7972',
        Icon: HiOutlineArrowPathRoundedSquare
    },
    {
        text: 'Ödənişlər',
        path: '/',
        color: '#7A885A',
        Icon: FaMoneyBillWave,
        quantity: 1
    },
    {
        text: 'Geri qaytarmalar',
        path: '/',
        color: '#655F59',
        Icon: BsArrowDownUp,
        quantity: 1
    },
    {
        text: 'Kreditlər/ Borclar',
        path: '/',
        color: '#B1B2A1',
        Icon: LuDivideCircle,
        quantity: 1
    },
    {
        text: 'Depositlər',
        path: '/',
        color: '#C5A253',
        Icon: PiWalletLight,
        quantity: 1
    },
    {
        text: 'İnsan resursları',
        path: '/',
        color: '#6E7972',
        Icon: PiHandshake,
        quantity: 1
    },
    {
        text: 'Müqavilə',
        path: '/',
        color: '#7A885A',
        Icon: AiOutlineFolderOpen,
        quantity: 1
    },
    {
        text: 'Sənəd göndərmək',
        path: '/',
        color: '#655F59',
        Icon: FaFileImport,
        quantity: 1
    },
    {
        text: 'Hesabatlar',
        path: '/',
        color: '#B1B2A1',
        Icon: BsCalculator,
        quantity: 1
    },
]