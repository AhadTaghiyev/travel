import { Link } from "react-router-dom";

export const homeBreadCrumb = (
  <Link key="1" to="/panel" className="pageLink link">
    aaaAna səhifə
  </Link>
);

//=====================
// Agreements
//=====================

export const agreementBreadCrumb = (
  <Link key="1" to="/panel/agreements" className="pageLink link">
    Müqavilə
  </Link>
);

export const newAgreementBreadCrumb = (
  <Link key="1" to="/panel/agreements/new" className="currentPageLink link">
    Müqavilə yarat
  </Link>
);

export const updateAgreementBreadCrumb = (
  <Link key="1" to="/panel/agreements/new" className="currentPageLink link">
    Müqaviləyə düzəliş et
  </Link>
);

//=====================
// Plane Tickets
//=====================

export const planeTicketBreadCrumb = (
  <Link key="1" to="/panel/aviabiletSale" className="currentPageLink link">
    Aviabilet satışı
  </Link>
);

export const newPlaneTicketBreadCrumb = (
  <Link key="1" to="/panel/aviabiletSale" className="currentPageLink link">
    Yeni B2C Aviabiletlər
  </Link>
);

export const updatePlaneTicketBreadCrumb = (
  <Link
    key="1"
    to="/panel/aviabiletSale/update/:id"
    className="currentPageLink link"
  >
    Aviabileti dəyiş
  </Link>
);

//=====================
// cootperative tickets
//=====================

export const CoorperativeTicketBreadCrumb = (
  <Link key="1" to="/panel/cooperativeTicket" className="pageLink link">
    Korporativ bilet satışı
  </Link>
);

export const newCoorperativeTicketBreadCrumb = (
  <Link key="1" to="/panel/cooperativeTicket" className="pageLink link">
    Yeni Korporativ bilet
  </Link>
);

export const updateCoorperativeTicketBreadCrumb = (
  <Link
    key="1"
    to="/panel/cooperativeTicket/update"
    className="currentPageLink link"
  >
    Korporativ biletə düzəliş et
  </Link>
);

//=====================
// tourPackages
//=====================

export const TourPackageBreadCrumb = (
  <Link key="1" to="/panel/tourPackage" className="pageLink link">
    Tur Paket satışı
  </Link>
);

export const newTourPackageBreadCrumb = (
  <Link key="1" to="/panel/tourPackage" className="pageLink link">
    Yeni Tur Paketi
  </Link>
);

export const updateTourPackageBreadCrumb = (
  <Link key="1" to="/panel/tourPackage/update" className="currentPageLink link">
    Tur Paketə düzəliş et
  </Link>
);

//=====================
// Individualtours
//=====================

export const IndividualTourBreadCrumb = (
  <Link key="1" to="/panel/individualTourPackage" className="pageLink link">
    Individual Tur Paketlərin satışı
  </Link>
);

export const newIndividualTourBreadCrumb = (
  <Link key="1" to="/panel/individualTourPackage" className="pageLink link">
    Yeni Individual Tur Paketi
  </Link>
);

export const updateIndividualTourBreadCrumb = (
  <Link
    key="1"
    to="/panel/individualTourPackage/update"
    className="currentPageLink link"
  >
    Individual Tur Paketə düzəliş et
  </Link>
);

//=====================
// Individualtours
//=====================

export const MassIncomeBreadCrumb = (
  <Link key="1" to="/panel/income" className="pageLink link">
    Mədaxil
  </Link>
);

export const newMassIncomeBreadCrumb = (
  <Link key="1" to="/panel/income" className="pageLink link">
    Yeni Mədaxil
  </Link>
);

export const updateMassIncomeBreadCrumb = (
  <Link key="1" to="/panel/income/update" className="currentPageLink link">
    Mədaxilə düzəliş et
  </Link>
);

//=====================
// OtherServices
//=====================

export const OtherServicesBreadCrumb = (
  <Link key="1" to="/panel/otherService" className="pageLink link">
    Digər Xidmətlər
  </Link>
);

export const newOtherServicesBreadCrumb = (
  <Link key="1" to="/panel/otherService" className="currentPageLink link">
    Yeni xidmət
  </Link>
);

export const updateOtherServicesBreadCrumb = (
  <Link
    key="1"
    to="/panel/otherService/update"
    className="currentPageLink link"
  >
    Xidmətə düzəliş et
  </Link>
);

//=====================
// Money Transfer
//=====================

export const MoneyTransfersBreadCrumb = (
  <Link key="1" to="/panel/paymentTransfers" className="pageLink link">
    Vəsait transferi
  </Link>
);

export const newMoneyTransfersBreadCrumb = (
  <Link key="1" to="/panel/paymentTransfers" className="currentPageLink link">
    Yeni Vəsait transferi
  </Link>
);

export const updateMoneyTransfersBreadCrumb = (
  <Link
    key="1"
    to="/panel/paymentTransfers/update"
    className="currentPageLink link"
  >
    Vəsait transferinə düzəliş et
  </Link>
);
