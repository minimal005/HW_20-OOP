class CssClass {
    static cssStyle =''
   constructor(name, styles){
      this.name = name
      this.styles = styles
   }
   // метод очистки 
   static clearCssStyle(){
    CssClass.cssStyle =''
   }
   // ■ метод встановлення стилю;
   addStyles(style){
    this.styles.push(style)
    return this.styles
   }
 // ■ метод видалення стилю;
   remStyles(style){
      let index = this.styles.indexOf(style)
      this.styles.splice(index,1)
      return this.styles
   }
   // ■ метод getCss(), який повертає CSS-код у вигляді рядка.
   getCss(){
    let styles = ''
    this.styles.forEach(element => {
        
        for(let key in element){
            styles += `${key}: ${element[key]};\n`
        }
    });
    CssClass.cssStyle += `\n.${this.name} {\n${styles}}`
      return CssClass.cssStyle
   }
}

const wrap = new CssClass('wrap', [{display: 'flex'}])
const block = new CssClass('block', [{width: '300px', magrin: '10px'}])
const img = new CssClass('img', [{width: '100%'}])
const text = new CssClass('text', [{'text-align': 'justify'}])
img.addStyles({height: '100%'}) //додає
img.remStyles({height: '100%'}) // видаляє
wrap.getCss()
block.getCss()
img.getCss()
text.getCss()
// console.log(CssClass.cssStyle)
// document.write(CssClass.cssStyle)
// CssClass.clearCssStyle()
// console.log(CssClass.cssStyle.length) //0



// Дописала умову перевірки в createStyles для того, що біля тегів без стилів не з"являвся зайвий надпис, відповідно перенесла закриття лапок
class HtmlElement {
   constructor(tagName, isClosed, text, attributes, styles, tags) {
       this.tagName = tagName
       this.isClosed = isClosed
       this.text = text
       this.attributes = attributes
       this.styles = styles
       this.tags = tags
   }
   setAttributs(attribute) {
       this.attributes.push(attribute)
   }
   setStyles(style) {
       this.styles.push(style)
   }
   addTagEnd(tag) {
       this.tags.push(tag)
   }
   addTagBegin(tag) {
       this.tags.unshift(tag)
   }
   createAttribute(html) {
       for (const attribute of this.attributes) {
           for (const key in attribute) {
               html += ` ${key} = "${attribute[key]}"`
           }
       }
       return html
   }
   createStyles(html) {
        if (this.styles.length == 0) return html
       html += ` style="`;
       for (const style of this.styles) {
           for (const key in style) {
               html += `${key}: ${style[key]}; `
           }
       }
       html += `"`
       return html
   }

   createOpenTag(html) {
       html += `<${this.tagName}`
       html = this.createAttribute(html)
       html = this.createStyles(html)
       html += `>`
       return html
   }

   createContent(html) {
       html += this.text
       if (this.tags.length != 0) {
           for (const element of this.tags) {
               html += element.getHtml()
           }
       }
       return html
   }

   createCloseTag() {
       return !this.isClosed ? `</${this.tagName}>` : ""
   }

   getHtml() {
       let html = ""
       html = this.createOpenTag(html)
       html = this.createContent(html)
       html += this.createCloseTag(html)
       return html
   }

}

let wrapper = new HtmlElement('div', false, "", [{id: "wrapper"}], [{display: 'flex'}], [])
let block1 = new HtmlElement('div', false, "", [], [{width: "300px", margin: "10px"}], [])
let heading1 = new HtmlElement('h3', false, "Lorem HEADING 1", [], [], [])
let image1 = new HtmlElement('img', true, "", [{
   src: "https://images.unsplash.com/photo-1692992258436-9e03ae4279ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
}, {alt: 'image 1'}], [{width: '100%'}], [])
let p1 = new HtmlElement('p', false, "Some text", [], [{"text-align": "justify"}], [])
let a1 = new HtmlElement('a', false, "More...", [
   {href: 'https://google.com'},
   {target: '_blank'}
], [], [])

block1.addTagEnd(heading1)
block1.addTagEnd(image1)
block1.addTagEnd(p1)
p1.addTagEnd(a1)
wrapper.addTagEnd(block1)

let block2 = new HtmlElement('div', false, "", [], [{width: "300px", margin: "10px"}], [])
let heading2 = new HtmlElement('h3', false, "Lorem HEADING 1", [], [], [])
let image2 = new HtmlElement('img', true, "", [{
   src: "https://images.unsplash.com/photo-1692992258436-9e03ae4279ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
}, {alt: 'image 1'}], [{width: '100%'}], [])
let p2 = new HtmlElement('p', false, "Some text", [], [{"text-align": "justify"}], [])
let a2 = new HtmlElement('a', false, "More...", [
   {href: 'https://google.com'},
   {target: '_blank'}
], [], [])

block2.addTagEnd(heading2)
block2.addTagEnd(image2)
block2.addTagEnd(p2)
p2.addTagEnd(a2)
wrapper.addTagEnd(block2)

// document.write(wrapper.getHtml())


class HtmlBlock {
    constructor(styles, html){
        this.styles = styles
        this.html = html
    }
    getCode(){
        const newHtmlBlock = `<style>\n${this.styles}</style>\n${this.html}`
        return newHtmlBlock
    }
}

const newCode = new HtmlBlock(CssClass.cssStyle, wrapper.getHtml())

document.write(newCode.getCode())
