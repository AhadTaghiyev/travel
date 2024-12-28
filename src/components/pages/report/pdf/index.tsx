import { formatDate, formatDateV2 } from "@/lib/utils";
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Şrifti Kaydedin
Font.register({
    family: "Noto Sans",
    src: "https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNb4g.ttf",
});

// Yardımcı Fonksiyon: HTML'den Formatted Text'e Dönüştürme
const htmlToFormattedText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const textParts = [];
    Array.from(tempDiv.childNodes).forEach((node) => {
        if (node.nodeName === "STRONG") {
            textParts.push({ text: node.textContent, bold: true });
        } else if (node.nodeName === "BR") {
            textParts.push({ text: "\n" });
        } else {
            textParts.push({ text: node.textContent });
        }
    });

    return textParts;
};

// PDF için Stil
const styles = StyleSheet.create({
    page: { padding: 15, paddingLeft: 25, paddingRight: 25, fontSize: 9, fontFamily: "Noto Sans" }, // Daha dar padding ve küçük font
    section: { marginBottom: 5 }, // Bölümler arasındaki boşluk azaldı
    header: { fontSize: 12, marginBottom: 4, fontFamily: "Noto Sans", fontWeight: "bold" },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
    table: { display: "flex", flexDirection: "column", marginTop: 5, borderWidth: 1, borderColor: "#000" },
    tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000" },
    tableCell: { flex: 1, padding: 3, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableCellInvoice: { flex: 0.7, padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableCellAirway: { flex: 0.5, padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableCellMeal: { flex: 0.7, padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableCellSellingPrice: { flex: 0.6, padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableCellTicketNoPrice: { flex: 0.7, padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableHeaderCell: { flex: 1, fontWeight: "bold", backgroundColor: "#f0f0f0", padding: 3, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableHeaderInvoiceCell: { flex: 0.7, fontWeight: "bold", backgroundColor: "#f0f0f0", padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableHeaderAirwayCell: { flex: 0.5, fontWeight: "bold", backgroundColor: "#f0f0f0", padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableHeaderMealCell: { flex: 0.7, fontWeight: "bold", backgroundColor: "#f0f0f0", padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableHeaderSellingPriceCell: { flex: 0.6, fontWeight: "bold", backgroundColor: "#f0f0f0", padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    tableHeaderTicketNoCell: { flex: 0.7, fontWeight: "bold", backgroundColor: "#f0f0f0", padding: 1, fontSize: 8, textAlign: "center", borderRightWidth: 1, borderRightColor: "#000" },
    noBorderRow: { flexDirection: "row", marginBottom: 2 },
    noBorderCell: { flex: 1, padding: 2, fontSize: 8 },
    boldText: { fontFamily: "Noto Sans", fontWeight: "bold" },
    regularText: { fontFamily: "Noto Sans" },
    logo: {
        width: 120,
        height: "auto",
        objectFit: "contain",
        marginBottom: 5,
        alignSelf: "flex-start",
    },
    invoiceText: { marginTop: 10, fontSize: 9, lineHeight: 1.4, textAlign: "justify" },
    sealImage: {
        width: 200, // Mühür genişliğini büyüttük
        height: 200, // Mühür yüksekliğini büyüttük
        objectFit: "contain",
        position: "absolute",
        right: 120, // Sağdan mesafeyi ayarladık
        bottom: 10, // Alttan mesafeyi ayarladık
    },
});




// PDF Bileşeni
const PDFDocument = ({ isReport = true, isTime = false, data, company, invoiceText, invoiceImage, headers, title, currency, companyName, companyImage, companyEmail, companyPhone, companyAddress, t }) => {
    console.log(data);
    console.log("invoiceImage", invoiceImage);


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Şirket Logosu */}
                <View style={[styles.section, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                    {/* Şirket Logosu */}
                    {companyImage && (
                        <Image style={[styles.logo, { marginRight: 10 }]} src={`data:image/png;base64,${companyImage}`} />
                    )}

                    {/* Şirket Bilgileri */}
                    <View>
                        <Text style={styles.header}>{companyName}</Text>
                        <Text>{t("Email")}: {companyEmail}</Text>
                        <Text>{t("Phone Number")}: {companyPhone}</Text>
                        <Text>{t("Address")}: {companyAddress}</Text>
                    </View>
                </View>

                {/* Başlık */}
                {title && (
                    <Text style={[styles.header, { textAlign: "center", marginBottom: 5, marginTop: 3 }]}>{t(title)}</Text>
                )}

                {/* Müştəri Məlumatları */}
                <View style={styles.section}>
                    <Text style={styles.header}>{t("Müştəri məlumatları")}</Text>
                    {Object.keys(data.simpleTable || data.customer).map((key, index) => {
                        if (key !== "id") { // 'id' alanını atlıyoruz
                            // Key'i biçimlendirme (Camel Case -> Ayrılmış ve İlk Harfleri Büyük)
                            const formattedKey = key
                                .replace(/([a-z])([A-Z])/g, "$1 $2") // Camel case'i boşluklarla ayırır
                                .replace(/^./, (str) => str.toUpperCase()); // İlk harfi büyük yapar

                            // Tarih key'leri için saat kısmını kaldırma
                            const value =
                                key.toLowerCase().includes("date")
                                    ? formatDateV2(
                                        data.simpleTable ? data.simpleTable[key] : data.customer[key],
                                    ) // Sadece tarihi göster
                                    : data.simpleTable ? data.simpleTable[key] : data.customer[key]; // Diğer key'ler için olduğu gibi bırak

                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text
                                        style={{
                                            width: "15%", // Key genişliği
                                            fontWeight: "bold",
                                            textAlign: "left",
                                        }}
                                    >
                                        {t(formattedKey)}:
                                    </Text>
                                    <Text
                                        style={{
                                            width: "85%", // Value genişliği
                                            textAlign: "left",
                                        }}
                                    >
                                        {value}
                                    </Text>
                                </View>
                            );
                        }
                        return null; // Eğer key 'id' ise hiçbir şey render edilmez
                    })}
                </View>

                {/* Gelir Tablosu */}
                {/* Gelirler (Incomes) Tablosu */}
                <View>
                    <View style={styles.table}>
                        {/* Tablo Başlıkları */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeaderCell}>{t("Receipt Number")}</Text>
                            <Text style={styles.tableHeaderCell}>{t("Invoice Number")}</Text>
                            <Text style={styles.tableHeaderCell}>{t("Payment Type")}</Text>
                            <Text style={styles.tableHeaderCell}>{t("Paid Amount")}</Text>
                            <Text style={styles.tableHeaderCell}>{t("Description")}</Text>
                        </View>

                        {/* Tablo Verileri */}
                        {isReport && data.incomes.length === 0 ? (
                            <View style={styles.tableRow}>
                                <Text
                                    style={{
                                        flex: 1,
                                        padding: 3,
                                        fontSize: 8,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {t("Payment not found")}
                                </Text>
                            </View>
                        ) : (
                            data.incomes ? data.incomes.map((income, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{income.ref}</Text>
                                    <Text style={styles.tableCell}>{income.invoiceNo}</Text>
                                    <Text style={styles.tableCell}>{income.payment}</Text>
                                    <Text style={styles.tableCell}>
                                        {(income.paidAmount * currency.value).toFixed(2)} {currency.name}
                                    </Text>
                                    <Text style={styles.tableCell}>{income.description || t("No Description")}</Text>
                                </View>
                            )) : (
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{data.ref}</Text>
                                    <Text style={styles.tableCell}>{data.invoiceNo}</Text>
                                    <Text style={styles.tableCell}>{data.payment}</Text>
                                    <Text style={styles.tableCell}>
                                        {(data.paidAmount * currency.value).toFixed(2)} {currency.name}
                                    </Text>
                                    <Text style={styles.tableCell}>{data.description || t("No Description")}</Text>
                                </View>
                            )
                        )}

                        {/* Alt Bilgiler */}
                        <>
                            {/* Ümumi Ödənilən Məbləğ */}
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { textAlign: "center", fontWeight: "bold", flex: isReport ? 0.197 : 0.192 }]}>
                                    {t("Total Paid Amount")}:
                                </Text>
                                <Text style={[styles.tableCell, { textAlign: "center", flex: isReport ? 0.197 : 0.192 }]}>
                                    {(
                                        data.incomes ? data.incomes.reduce((acc, income) => acc + income.paidAmount * currency.value, 0) : data.paidAmount *
                                            currency.value
                                    ).toFixed(2)}{" "}
                                    {currency.name}
                                </Text>
                                {data.incomes ? (<><Text style={[styles.tableCell, { textAlign: "center", fontWeight: "bold", flex: 0.198 }]}>
                                    {t("balance")}:
                                </Text>
                                    <Text style={[styles.tableCell, { textAlign: "center", flex: 0.198 }]}>
                                        {(
                                            (data.totals.totalPrice -
                                                data.incomes.reduce((acc, income) => acc + income.paidAmount, 0)) *
                                            currency.value
                                        ).toFixed(2)}{" "}
                                        {currency.name}
                                    </Text></>) : ""}

                            </View>
                        </>
                    </View>
                </View>


                {/* Rapor Tablosu */}
                {isReport ? (<View>
                    <View style={styles.section}>
                        <View style={styles.table}>
                            {/* Tablo Başlıkları */}
                            <View style={styles.tableRow}>
                                {headers.map((header, index) => {
                                    if (header.propertyName.toLowerCase() === "airway") {
                                        return (
                                            <Text key={index} style={styles.tableHeaderAirwayCell}>
                                                {t(header.fieldName)}
                                            </Text>
                                        );
                                    } else if (header.propertyName.toLowerCase() === "meal") {
                                        return (
                                            <Text key={index} style={styles.tableHeaderMealCell}>
                                                {t(header.fieldName)}
                                            </Text>
                                        );
                                    } else if (header.propertyName.toLowerCase() === "sellingprice") {
                                        return (
                                            <Text key={index} style={styles.tableHeaderSellingPriceCell}>
                                                {t(header.fieldName)}
                                            </Text>
                                        );
                                    } else if (header.propertyName.toLowerCase() === "invoiceno") {
                                        return (
                                            <Text key={index} style={styles.tableHeaderInvoiceCell}>
                                                {t(header.fieldName)}
                                            </Text>
                                        );
                                    } else if (header.propertyName.toLowerCase() === "ticketno") {
                                        return (
                                            <Text key={index} style={styles.tableHeaderTicketNoCell}>
                                                {t(header.fieldName)}
                                            </Text>
                                        );
                                    } else {
                                        return (
                                            <Text key={index} style={styles.tableHeaderCell}>
                                                {t(header.fieldName)}
                                            </Text>
                                        );
                                    }
                                })}
                            </View>


                            {/* Tablo Verileri */}
                            {data.items.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    {headers.map((header, hIndex) => {
                                        if (header.propertyName.toLowerCase() === "invoicedirection") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCell}>
                                                    {item.invoiceDriection &&
                                                        item.invoiceDriection.map((direction, dirIndex) => {
                                                            console.log(direction); return (
                                                                <Text key={dirIndex}>
                                                                    {formatDate(direction.flightDate)} - {direction.direction}
                                                                </Text>
                                                            )
                                                        })}
                                                </Text>
                                            );
                                        } else if (header.propertyName.toLowerCase() === "insurance") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCell}>
                                                    {item.insurance ? t("Bəli") : t("Xeyr")}
                                                </Text>
                                            );
                                        } else if (header.propertyName.toLowerCase() === "childrenadultcount") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCell}>
                                                    {item.childrenCount} - {item.adultsCount}
                                                </Text>
                                            );
                                        } else if (header.propertyName.toLowerCase() === "airway") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCellAirway}>
                                                    {item.airway}
                                                </Text>
                                            );
                                        } else if (header.propertyName.toLowerCase() === "meal") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCellMeal}>
                                                    {item.meal}
                                                </Text>
                                            );
                                        } else if (header.propertyName.toLowerCase() === "sellingprice") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCellSellingPrice}>
                                                    {(item.sellingPrice * currency.value).toFixed(2)} {currency.name}
                                                </Text>
                                            );
                                        } else if (header.propertyName.toLowerCase() === "ticketno") {
                                            return (
                                                <Text key={hIndex} style={styles.tableCellTicketNoPrice}>
                                                    {item.ticketNo}
                                                </Text>
                                            );
                                        } else {
                                            return (
                                                <Text key={hIndex} style={header.propertyName === "invoiceNo" ? styles.tableCellInvoice : styles.tableCell}>
                                                    {header.propertyName.toLowerCase().includes("price")
                                                        ? `${(item[header.propertyName] * currency.value).toFixed(2)} ${currency.name}`
                                                        : header.propertyName.toLowerCase().includes("date")
                                                            ? isTime ? formatDateV2(item[header.propertyName]) : formatDate(item[header.propertyName])
                                                            : item[header.propertyName]}
                                                </Text>
                                            );
                                        }
                                    })}
                                </View>
                            ))}


                        </View>
                    </View>
                    {/* Tablo Alt Bilgileri */}
                    <View style={styles.section}>
                        <View style={[styles.table, { marginTop: 0 }]}>
                            {data.totals && (
                                <>
                                    {/* Satış Fiyatı */}
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { textAlign: "center", fontWeight: "bold", flex: 9 }]}>
                                            {t("Sale price")}:
                                        </Text>
                                        <Text style={[styles.tableCell, { textAlign: "center", flex: 8.5 }]}>
                                            {(data.totals.totalSellingPrice * currency.value).toFixed(2)} {currency.name}
                                        </Text>
                                        <Text style={[styles.tableCell, { textAlign: "center", fontWeight: "bold", flex: 7 }]}>
                                            {t("Discount")}:
                                        </Text>
                                        <Text style={[styles.tableCell, { textAlign: "center", flex: 5 }]}>
                                            {(data.totals.totalDiscountPrice * currency.value).toFixed(2)} {currency.name}
                                        </Text>
                                        <Text style={[styles.tableCell, { textAlign: "center", fontWeight: "bold", flex: 6 }]}>
                                            {t("Net price")}:
                                        </Text>
                                        <Text style={[styles.tableCell, { textAlign: "center", flex: 6 }]}>
                                            {(data.totals.totalPrice * currency.value).toFixed(2)} {currency.name}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </View>) : ""}

                {/* Invoice Text */}
                <View>
                    {invoiceText && htmlToFormattedText(invoiceText).map((part, index) => (
                        <Text
                            key={index}
                            style={part.bold ? styles.boldText : styles.regularText}
                        >
                            {part.text}
                        </Text>
                    ))}
                </View>

                {/* Şirket Mührü */}
                {company.companySealBase64 && (
                    <Image style={styles.sealImage} src={`data:image/png;base64,${company.companySealBase64}`} />
                )}
            </Page>
        </Document>
    );
};

export default PDFDocument;




