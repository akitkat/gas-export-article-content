const doGet = e => {
  const ids = e.parameter.ids.split`,`
  const sql = SpreadSheetsSQL.open(SpreadsheetApp.getActiveSpreadsheet().getId(), 'common')
  const data = sql.select(['No.', 'title', 'content', 'instagram']).filter(`No. IN ${ids}`).result()

  let res = `<div class="toc_container toc_white no_bullets"><p class="toc_title">目次</p><ul class="toc_list">`;
  for (let i in data) {
    res += `
        <li>
            <a href="#${Number(i) + 1}">
                <span class="toc_number toc_depth_${Number(i) + 1}">${Number(i) + 1}</span>
                ${e.parameter.title}${Number(i) + 1}：${data[i]['title']}
            </a>
        </li>
    `;
  }
  res += `</ul></div>`;

  for (let i in data) {
    res += `
      <h2 id="${Number(i) + 1}">${e.parameter.title}${Number(i) + 1}: ${data[i]['title']}</h2>
      <p class="well3">${data[i]['content']}</p>
      ${data[i]['instagram']}
    `
  }
  return ContentService.createTextOutput(res).setMimeType(ContentService.MimeType.TEXT);
}
