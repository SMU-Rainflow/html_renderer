import { TemplateEngine } from './engine';
import '../css/style.css';

class TemplateDemo {
    constructor() {
        this.engine = new TemplateEngine();
        this.template = `
            <div class="card">
                <h3>{{title}}</h3>
                <div class="info">
                    <p>姓名：{{user.name}}</p>
                    <p>年龄：{{user.age}}</p>
                    <p>城市：{{user.address.city}} {{user.address.district}}</p>
                    <p>公司：{{company}}</p>
                    <p>会员状态：{{isVIP ? 'VIP会员' : '普通用户'}}</p>
                    <p>技能：{{user.skills.join(', ')}}</p>
                </div>
            </div>
        `;
    }

    init() {
        this.renderInitialData();
        this.startAutoUpdate();
    }

    renderInitialData() {
        const data = {
            title: '个人信息卡片',
            user: {
                name: '张三',
                age: 28,
                skills: ['JavaScript', 'Python', 'Java'],
                address: {
                    city: '北京',
                    district: '朝阳区'
                }
            },
            company: '科技有限公司',
            isVIP: true
        };

        this.updateTemplate(data);
    }

    startAutoUpdate() {
        setInterval(() => {
            const newData = {
                title: '更新后的个人信息 ' + new Date().toLocaleString(),
                user: {
                    name: '王小明',
                    age: 25,
                    skills: ['Vue', 'React', 'Node.js'],
                    address: {
                        city: '上海',
                        district: '浦东新区'
                    }
                },
                company: '创新科技股份有限公司',
                isVIP: false
            };
            this.updateTemplate(newData);
        }, 2000);
    }

    updateTemplate(data) {
        const result = this.engine.render(this.template, data);
        document.getElementById('result').innerHTML = result;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const demo = new TemplateDemo();
    demo.init();
}); 