export const formatTel = (tel) => {
    if (tel === undefined) {
        return "";
    }
    if (tel.startsWith('225')) {
        return "(+225)" + tel.slice(3).replace(/\B(?=(\d{2})+(?!\d))/g, " ");
    }
    return "";
};
