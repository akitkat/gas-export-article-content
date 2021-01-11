const doGet = e => {
    if (e.parameter.test !== undefined) {
        return test(e)
    }

    const post_id = e.parameter.post_id
    const spreadsheet_id = SpreadsheetApp.getActiveSpreadsheet().getId()
    const settings = SpreadSheetsSQL.open(spreadsheet_id, 'article_ids').select(['post_id', 'ids', 'table_text']).filter(`post_id = ${post_id}`).result()
    const data = SpreadSheetsSQL.open(spreadsheet_id, 'common').select(['No.', 'title', 'content', 'instagram']).filter(`No. IN ${settings[0]['ids'].split(',')}`).result()

    let res = `<div class="toc_container toc_white no_bullets"><p class="toc_title">目次</p><ul class="toc_list">`;
    for (let i in data) {
        res += `
            <li>
                <a href="#${Number(i) + 1}">
                    <span class="toc_number toc_depth_${Number(i) + 1}">${Number(i) + 1}</span>
                    ${settings[0]['table_text']}${Number(i) + 1}：${data[i]['title']}
                </a>
            </li>
        `;
    }
    res += `</ul></div>`;

    for (let i in data) {
        res += `
            <h2 id="${Number(i) + 1}">${settings[0]['table_text']}${Number(i) + 1}: ${data[i]['title']}</h2>
            <p class="well3">${data[i]['content']}</p>
            ${data[i]['instagram']}
        `
    }
    return ContentService.createTextOutput(res).setMimeType(ContentService.MimeType.TEXT);
}

const test = e => {
    let res = ''
    return ContentService.createTextOutput(res).setMimeType(ContentService.MimeType.TEXT);
}
