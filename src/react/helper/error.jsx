// error.jsx
// it's simple module to show error on page. Used bootstrap-notify plagin.


// error list. Code - description.
const LIST_OF_ERRORS = {
    454: "Пользователь с таким именем уже существует.",
    455: "Пустое поле 'Имя' или 'Пароль'.",
    456: "Не надо пытаться удалить себя. Самоубийство - грех!",
    503: "Сервер, почему-то, не может обработь этот запрос.",
    550: "Сервер не может созать пользователя. Возможно ошибка БД.",
    551: "Сервер не может удалить. Возможно ошибка БД."
};

/**
 * Show error msg require an error code.
 * @param {Number} code Number of response error code.
 */
export function showResponseError(code) {
    $.notify
        ({
            title: "ОШИБКА.",
            message: LIST_OF_ERRORS[code]
        },
        {
            type: 'danger'
        });
};

export function showMsgError(msg) {
    $.notify
        ({
            title: "ОШИБКА.",
            message: msg
        },
        {
            type: 'danger'
        });
};