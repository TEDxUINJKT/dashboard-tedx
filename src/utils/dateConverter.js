function isoConverter(isoFormat) {
    // Mendapatkan tanggal dari string ISO
    const date = new Date(isoFormat);

    // Mendapatkan informasi tanggal, bulan, dan tahun
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const month_formatter = month > 10 ? month : '0' + month
    const day_formatter = day > 10 ? day : '0' + day

    // Membuat string hasil
    const response = `${year}-${month_formatter}-${day_formatter}`;

    return response;
}

function datePrettier(raw) {
    const date_split = raw.split('-')

    const months = [
        "Januari", "Februari", "Maret",
        "April", "Mei", "Juni",
        "Juli", "Agustus", "September",
        "Oktober", "November", "Desember"
    ];

    const day = date_split[2]
    const month = months[parseInt(date_split[1]) - 1];
    const year = date_split[0]

    const response = `${day} ${month} ${year}`;
    return response;
}

export { isoConverter, datePrettier }