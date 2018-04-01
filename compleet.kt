@file:JsModule("compleet")
@file:JsNonModule
package moe.yui.compleet

import org.w3c.dom.HTMLInputElement

external interface ICompleetOptions {
    val maxResults: Int
    val source: (term: String, resp: (terms: Array<String>, value: String) -> Unit) -> Unit
}

external fun compleet(input: HTMLInputElement, opts: ICompleetOptions): Unit = definedExternally
