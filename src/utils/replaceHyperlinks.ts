
/**
 * Detects links in the string and replaces it with anchor tag
 * @param message 
 * @returns 
 */
export const replaceHyperlinks = (message: string) => {
    if (!message) return '';

    let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
        let hyperlink = url;
        if (!hyperlink.match('^https?:')) {
            hyperlink = 'http://' + hyperlink;
        }
        return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
    });
}