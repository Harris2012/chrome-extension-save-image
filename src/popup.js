function clickjpg() {
    saveFiles(['.jpg', '.JPG']);;
}
function clickpng() {
    saveFiles(['.png', '.PNG']);
}
function clickgif() {
    saveFiles(['.gif', '.GIF']);
}
function clickall() {
    saveFiles();
}

function saveFiles(extensions) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs == null || tabs.length == 0) {
            return;
        }
        var tab = tabs[0];

        chrome.tabs.executeScript(tab.id, {
            code: "var imgs = document.body.getElementsByTagName('img'); if (imgs != null && imgs.length > 0) { var items = []; for (var i = 0; i < imgs.length; i++) { items.push(imgs[i].src)};items}"
        }, function (items) {
            if (items == null || items.length == 0) {
                return;
            }
            var links = items[0];
            if (links == null || links.length == 0) {
                return;
            }
            links = Array.from(new Set(links));
            for (var i = 0; i < links.length; i++) {
                var extension = links[i].substring(links[i].lastIndexOf('.'));
                if (extensions != null || extensions.length > 0) {
                    var isMatch = false;
                    for (var j = 0; j < extensions.length; j++) {
                        if (extensions[j] == extension) {
                            isMatch = true;
                            break;
                        }
                    }
                    if (!isMatch) {
                        continue;
                    }
                }
                chrome.downloads.download({ url: links[i] });
            }
        });
    });
}

$(function () {
    $('#getjpg').click(clickjpg);
    $('#getpng').click(clickpng);
    $('#getgif').click(clickgif);
    $('#getall').click(clickall);
});