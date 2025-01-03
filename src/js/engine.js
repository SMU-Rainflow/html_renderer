export class TemplateEngine {
    constructor() {
        this.templateCache = new Map();
    }

    render(template, data) {
        let compiledTemplate = this.templateCache.get(template);
        
        if (!compiledTemplate) {
            compiledTemplate = this.compile(template);
            this.templateCache.set(template, compiledTemplate);
        }

        return compiledTemplate(data);
    }

    compile(template) {
        const code = template
            .replace(/[\r\t\n]/g, '')
            .replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
                const safeExpression = expression.trim().startsWith('data.') 
                    ? expression.trim() 
                    : `data.${expression.trim()}`;
                return `' + (${safeExpression} || '') + '`;
            });

        const functionBody = `
            try {
                return '${code}';
            } catch (e) {
                console.error('Template rendering error:', e);
                return '';
            }
        `;

        return new Function('data', functionBody);
    }
} 