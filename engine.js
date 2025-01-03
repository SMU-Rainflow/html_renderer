export class TemplateEngine {
    constructor() {
        this.templateCache = new Map();
    }

    /**
     * 渲染模板
     * @param {string} template 模板字符串
     * @param {Object} data 数据对象
     * @returns {string} 渲染后的结果
     */
    render(template, data) {
        // 检查缓存中是否存在编译后的模板函数
        let compiledTemplate = this.templateCache.get(template);
        
        if (!compiledTemplate) {
            // 如果没有缓存，则编译模板
            compiledTemplate = this.compile(template);
            this.templateCache.set(template, compiledTemplate);
        }

        return compiledTemplate(data);
    }

    /**
     * 编译模板
     * @param {string} template 模板字符串
     * @returns {Function} 编译后的函数
     */
    compile(template) {
        // 将模板转换为可执行的JavaScript代码
        const code = template
            // 转义特殊字符
            .replace(/[\r\t\n]/g, '')
            // 处理表达式
            .replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
                // 确保表达式以 data. 开头
                const safeExpression = expression.trim().startsWith('data.') 
                    ? expression.trim() 
                    : `data.${expression.trim()}`;
                return `' + (${safeExpression} || '') + '`;
            });

        // 构建函数体
        const functionBody = `
            try {
                return '${code}';
            } catch (e) {
                console.error('Template rendering error:', e);
                return '';
            }
        `;

        // 创建渲染函数
        return new Function('data', functionBody);
    }
}
