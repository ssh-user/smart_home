import React from "react";

export class About extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.headerChange(this.props.header);
    };

    render() {
        return <div className="sens-container sens-viewport">
            <p className="text-justify text-indent">
                Данный проект преследовал множество личных целей, а именно: основа для "умного дома"
            и как следствие разобраться с работой микроэлектроники, получение навыков написания приложений
            на Реакте (это мое первое знакомство с ним), получение навыков работы с sql базой, а
            конкретней mysql (до этого предпочитал использовать no-sql) а также улучшение навыков
            работы с node.js и в целом программирования.
            </p>
            <p className="text-justify text-indent">
                За "железную" основу был выбран mini-board Orange Pi +2E, прикупленный при случае, на момент
            старта продаж. Лучшими особенностями платы можно назвать большой обьем ОЗУ 2GB и наличие eMMC памяти
            16 Gb и конечноже цена :)
            </p>
            <p className="text-justify text-indent">
                Операционная система - серверный ARMBIAN, разновидность АРМ Дебиана с фиксами, без GUI.
            С большой частью задач легко бы справился и Ардуино, но хотел полноценный управляемый веб-сервер
            + Ардуино максимум смог бы работать с IP камерами. Вообщем orange pi это полноценный линукс и как
            следствие больше возможностей, хотя и при некоторых недостатках, например, более долгой загрузки.
            </p>
            <p className="text-justify text-indent">
                Фронтенд написан на React + Bootstrap 4, бекэнд - node (express), немножко websocket,
            sequelize (ОРМ для базы данных) всё это пропущено через webpack с babel. Помимо этого ряд дополнений,
            модулей и всякое такое, с полным списком можете ознакомится в package.json файле, если интересно.
            </p>
            <p className="text-justify text-indent">
                В целом, проект можно считать успешным т.к. поставленные цели были достигнуты, хотя и не без
            недостатков. Самым главным расстройством стало понимание, что для полноценного "умного дома" нужно
            закладываться на этапе ремонта, а лучше даже строительства. Так что никаких тебе управлений питанием,
            вентиляцией и прочих вкусностей. В конкретно моей ситуации, здесь и сейчас, это невозможно.
            </p>
            <p className="text-justify text-indent">
                Самой большой трудностью стал "проброс" обычной веб-камеры на страничку сайта, если продвинутые
            ИП камеры, сами "транслируют" себя в сеть и достаточно просто подключится к ним, то обычную камеру
            пришлось "захватывать", подбирать кодек и качество по соотношению с нагрузкой на проц (который слабенький).
            </p>
            <p className="text-justify text-indent">
                В целом, на данном этапе, "умный дом" выполняет функцию сигнализации (датчики движения, открытия
            двери, датчики газа и протечки) с управлением и оповещением как через инет так и через телефон.
            </p>
        </div >;
    };
};