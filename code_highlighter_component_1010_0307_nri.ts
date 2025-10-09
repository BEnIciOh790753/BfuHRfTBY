// 代码生成时间: 2025-10-10 03:07:21
import { Component, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-code-highlighter',
  template: `<pre><code [innerHTML]="highlightedCode"></code></pre>`,
  styles: ['code { white-space: pre-wrap; }']
})
export class CodeHighlighterComponent implements AfterViewInit {
  @Input() code: string;
  highlightedCode: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    try {
      // Set the code to be highlighted
      this.highlightedCode = this.highlightCode(this.code);
      // Use Renderer2 to update the innerHTML to avoid security risks
      this.renderer.setProperty(this.el.nativeElement.querySelector('code'), 'innerHTML', this.highlightedCode);
    } catch (error) {
      console.error('Error highlighting code:', error);
      // Fallback to original code if highlighting fails
      this.highlightedCode = this.escapeHtml(this.code);
    }
  }

  /**
   * Highlights the code using Prism.js
   * @param code The code to be highlighted.
   * @returns The highlighted code.
   */
  private highlightCode(code: string): string {
    // Assuming Prism is loaded globally, otherwise we need to import it
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }

  /**
   * Escapes HTML to prevent XSS attacks.
   * @param code The code to be escaped.
   * @returns The escaped code.
   */
  private escapeHtml(code: string): string {
    const text = document.createTextNode(code);
    const p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
  }
}
