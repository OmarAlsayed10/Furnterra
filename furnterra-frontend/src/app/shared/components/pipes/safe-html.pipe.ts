import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";



@Pipe({name:'safeHtml',standalone:true})
export class safeHtmlPipe implements PipeTransform{
    constructor(private s:DomSanitizer){}
    transform(value: string):SafeHtml {
            return this.s.bypassSecurityTrustHtml(value)
    }
}