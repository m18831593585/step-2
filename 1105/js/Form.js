import Component from "./Component.js";
export default class Form extends Component {

    cssBool = false

    constructor() {
        super();

    }


    setCss() {
        if(Component.cssBool) return;
        Component.cssBool=true;
        Form.setCss(`
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            height: 30px;
            margin-top: 20px;
        }

        li {
            float: left;
            padding: 0 40px;
            background-color: skyblue;
            border: 1px solid #000;
        }

        table {
            width: 600px;

            border: 1px solid #000;
            border-collapse: collapse;
            overflow: auto;
        }

        thead th {
            border: 1px solid #000;

        }

        thead > tr {
            height: 30px;
        }
        `)
    }
}