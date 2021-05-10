import { parser } from "./lang.js"
import { LezerLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import { styleTags, tags as t } from "@codemirror/highlight"


import { config, EditorState, EditorView } from "./config.js"
import { Prec } from "@codemirror/state"
import { keymap } from "@codemirror/view"

import { completeFromList, acceptCompletion } from "@codemirror/autocomplete"


export const EXAMPLELanguage = LezerLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Application: delimitedIndent({closing: ")", align: false})
              }),
              foldNodeProp.add({
                Application: foldInside
              }),
            styleTags({
                VariableName: t.variableName,
                Number: t.number,
                ArithOp : t.arithmeticOperator,
                Property: t.propertyName,
                "( )": t.paren,
                ".": t.derefOperator
            })
        ]
    }),
    languageData: {
        closeBrackets: {
            brackets: ["("],
            before: ")"
        },
    }
})

export function EXAMPLE() {
    let myCompletion = EXAMPLELanguage.data.of({
        autocomplete: completionSource
    });
    return new LanguageSupport(EXAMPLELanguage, [myCompletion]);
}

let completionResults = [
    { label: "var1", detail: "unit", info: "Full var name 1" },
    { label: "var2", detail: "unit2", info: "Full var name 2" }
];

let suffixCompletion = completeFromList([
    { label: "Abs", info: "" },
    { label: "Gross", info: ""},
    { label: "Net" }
])
let predefCompletionSource = completeFromList(completionResults);
let added = false;

window.addVarName = function () {
    if (!added) {
        completionResults.push(
            { label: "var3", detail: "unit3" }
        );
        added = true;
        console.log("Added variable name");
    }
};


function completionSource(context) {
    if(context.tokenBefore("VariableName") || context.explicit ) {
        return predefCompletionSource(context);
    }
    if(context.matchBefore(/\.(\w)*/)) {
        context.explicit = true;
        let result = suffixCompletion(context);
        context.explicit = false;
        return result;
    }
}

function preventNewLines() {
    return keymap.of([{
        key: "Enter",
        preventDefault: true,
        shift(view) { document.activeElement.blur(); return true; },
        run(view) { document.activeElement.blur(); return true; }
    },
    {
        key: "Tab",
        preventDefault: true,
        run(view) { acceptCompletion(view); return true; }
    }])
}

function onChange(update) {
    console.log("Change event handler notified");
    if(update.focusChanged) {
        console.log("Focus changed");
    }
}

window.createEditor = function(container) {
    let startState = EditorState.create({
        doc: "-variable.Abs * (3 + var_2)",
        extensions: [
            config,
            Prec.override(preventNewLines()),
            EditorView.updateListener.of(onChange),
            // EditorView.domEventHandlers({
            //     change: onChange
            // }),
            EXAMPLE()
        ]});
    let view = new EditorView({
        state: startState,
        parent: container
    });
    console.log("EditorView.domEventHandlers")
}