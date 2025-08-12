// 템플릿 렌더링 함수 - 화면 최대 활용 버전
class TemplateRenderer {
    constructor(templateData) {
        this.templates = templateData.templates;
        this.brandGuidelines = templateData.brand_guidelines;
    }

    // 레이아웃 코드를 기반으로 템플릿 찾기
    findTemplate(layoutCode) {
        // one_row_layouts에서 찾기
        for (const key in this.templates.one_row_layouts) {
            if (this.templates.one_row_layouts[key].code === layoutCode) {
                return this.templates.one_row_layouts[key];
            }
        }
        
        // two_row_layouts에서 찾기
        for (const key in this.templates.two_row_layouts) {
            if (this.templates.two_row_layouts[key].code === layoutCode) {
                return this.templates.two_row_layouts[key];
            }
        }
        
        return null;
    }

    // 컬럼 컨텐츠 렌더링 - 개선된 버전
    renderColumn(columnData, columnsCount) {
        const columnClass = `column-${columnsCount}`;
        let content = `<div class="${columnClass}">`;
        
        if (columnData.icon) {
            content += `<div class="column-icon">${columnData.icon}</div>`;
        }
        
        if (columnData.title) {
            content += `<h3 class="column-title">${columnData.title}</h3>`;
        }
        
        if (columnData.body) {
            content += `<p class="column-body">${columnData.body}</p>`;
        }
        
        // 추가 콘텐츠 타입 지원
        if (columnData.list) {
            content += '<ul class="column-list">';
            columnData.list.forEach(item => {
                content += `<li>${item}</li>`;
            });
            content += '</ul>';
        }
        
        if (columnData.footer) {
            content += `<div class="column-footer">${columnData.footer}</div>`;
        }
        
        content += `</div>`;
        return content;
    }

    // 전체 너비 컨텐츠 렌더링 - 카드 스타일 보장
    renderFullWidth(contentData) {
        let content = '<div class="full-width-content">';
        
        if (contentData.icon) {
            content += `<div class="full-width-icon">${contentData.icon}</div>`;
        }
        
        if (contentData.title) {
            content += `<h2 class="full-width-title">${contentData.title}</h2>`;
        }
        
        if (contentData.subtitle) {
            content += `<p class="full-width-subtitle">${contentData.subtitle}</p>`;
        }
        
        if (contentData.body) {
            content += `<div class="full-width-body">${contentData.body}</div>`;
        }
        
        // 리스트 지원
        if (contentData.list) {
            content += '<ul class="full-width-list">';
            contentData.list.forEach(item => {
                content += `<li>${item}</li>`;
            });
            content += '</ul>';
        }
        
        // 버튼 지원
        if (contentData.button) {
            content += `<button class="full-width-button">${contentData.button}</button>`;
        }
        
        if (contentData.footer) {
            content += `<div class="full-width-footer">${contentData.footer}</div>`;
        }
        
        content += '</div>';
        return content;
    }

    // 행 렌더링 - 화면 최대 활용
    renderRow(rowData, rowIndex) {
        const rowClass = `row row-${rowIndex} columns-${rowData.columns}`;
        let content = `<div class="${rowClass}">`;
        
        if (rowData.columns === 1) {
            // 전체 너비 렌더링
            content += this.renderFullWidth(rowData.content[0]);
        } else {
            // 다중 컬럼 렌더링
            content += '<div class="columns-wrapper">';
            rowData.content.forEach((col, idx) => {
                // 애니메이션을 위한 인덱스 추가
                const animatedCol = { ...col, _index: idx };
                content += this.renderColumn(animatedCol, rowData.columns);
            });
            content += '</div>';
        }
        
        content += '</div>';
        return content;
    }

    // 슬라이드 렌더링 - 전체 화면 활용
    renderSlide(layoutCode, contentData) {
        const template = this.findTemplate(layoutCode);
        if (!template) {
            console.error(`Template not found for layout code: ${layoutCode}`);
            return '';
        }

        let slideContent = `<div class="slide layout-${layoutCode.replace('+', '-')}">`;
        slideContent += '<div class="slide-inner">';

        // 각 행 렌더링
        if (template.structure.row1) {
            // 실제 콘텐츠로 템플릿 데이터 대체
            const row1Data = this.mergeContentWithTemplate(
                template.structure.row1,
                contentData.row1 || contentData
            );
            slideContent += this.renderRow(row1Data, 1);
        }

        if (template.structure.row2) {
            const row2Data = this.mergeContentWithTemplate(
                template.structure.row2,
                contentData.row2
            );
            slideContent += this.renderRow(row2Data, 2);
        }

        slideContent += '</div>';
        slideContent += '</div>';

        return slideContent;
    }

    // 콘텐츠와 템플릿 구조 병합 - 개선된 버전
    mergeContentWithTemplate(templateRow, contentData) {
        if (!contentData) return templateRow;

        const merged = {
            columns: templateRow.columns,
            content: []
        };

        if (templateRow.columns === 1) {
            // 전체 너비 콘텐츠
            merged.content.push({
                type: 'full-width',
                icon: contentData.icon || templateRow.content[0].icon,
                title: contentData.title || templateRow.content[0].title,
                subtitle: contentData.subtitle || templateRow.content[0].subtitle,
                body: contentData.body || templateRow.content[0].body,
                list: contentData.list || templateRow.content[0].list,
                button: contentData.button || templateRow.content[0].button,
                footer: contentData.footer || templateRow.content[0].footer
            });
        } else {
            // 다중 컬럼 콘텐츠
            const contentArray = Array.isArray(contentData) ? contentData : contentData.content || [];
            
            for (let i = 0; i < templateRow.columns; i++) {
                const templateCol = templateRow.content[i] || {};
                const contentCol = contentArray[i] || {};
                
                merged.content.push({
                    type: 'column',
                    icon: contentCol.icon || templateCol.icon,
                    title: contentCol.title || templateCol.title,
                    body: contentCol.body || templateCol.body,
                    list: contentCol.list || templateCol.list,
                    footer: contentCol.footer || templateCol.footer
                });
            }
        }

        return merged;
    }

    // 자동 레이아웃 추천 - 개선된 로직
    recommendLayout(content) {
        // 콘텐츠 분석 로직
        if (content.type === 'title' || content.type === 'intro' || content.type === 'conclusion') {
            return '11'; // 전체 너비
        } else if (content.type === 'comparison' && content.items) {
            if (content.items.length === 2) return '22';
            if (content.items.length === 3) return '33';
            if (content.items.length === 4) return '44';
            if (content.items.length > 4 && content.items.length <= 6) return '3+3';
            if (content.items.length > 6 && content.items.length <= 8) return '4+4';
        } else if (content.type === 'process' || content.type === 'steps') {
            if (content.steps && content.steps.length <= 4) {
                return `1+${content.steps.length}`;
            } else if (content.steps && content.steps.length > 4) {
                return '1+4'; // 또는 여러 슬라이드로 분할
            }
        } else if (content.type === 'overview-detail') {
            if (content.details && content.details.length === 2) return '1+2';
            if (content.details && content.details.length === 3) return '1+3';
            if (content.details && content.details.length === 4) return '1+4';
        } else if (content.type === 'matrix' || content.type === 'grid') {
            if (content.items && content.items.length === 4) return '2+2';
            if (content.items && content.items.length === 6) return '3+3';
            if (content.items && content.items.length === 8) return '4+4';
        }
        
        // 기본값
        return '11';
    }

    // 콘텐츠 밀도 분석
    analyzeContentDensity(content) {
        let totalWords = 0;
        
        // 텍스트 길이 계산
        if (typeof content === 'string') {
            totalWords = content.split(/\s+/).length;
        } else if (typeof content === 'object') {
            const allText = JSON.stringify(content);
            totalWords = allText.split(/\s+/).length;
        }
        
        if (totalWords < 50) {
            return 'low'; // 큰 폰트, 넓은 여백
        } else if (totalWords < 150) {
            return 'medium'; // 표준 레이아웃
        } else {
            return 'high'; // 작은 폰트, 촘촘한 레이아웃 또는 분할 필요
        }
    }

    // 슬라이드 분할 제안
    suggestSlideSplit(content, maxItemsPerSlide = 4) {
        if (!content.items || content.items.length <= maxItemsPerSlide) {
            return [content]; // 분할 불필요
        }
        
        const slides = [];
        const items = [...content.items];
        
        while (items.length > 0) {
            slides.push({
                ...content,
                items: items.splice(0, maxItemsPerSlide)
            });
        }
        
        return slides;
    }
}

// 헬퍼 함수들
function createSlideFromContent(layoutCode, content) {
    const renderer = new TemplateRenderer(presentationData);
    return renderer.renderSlide(layoutCode, content);
}

// 빠른 슬라이드 생성 함수들
function createTitleSlide(title, subtitle, footer) {
    return createSlideFromContent('11', {
        title: title,
        subtitle: subtitle,
        footer: footer || new Date().toLocaleDateString('ko-KR')
    });
}

function createComparisonSlide(title, leftItem, rightItem) {
    return createSlideFromContent('1+2', {
        row1: { title: title },
        row2: [leftItem, rightItem]
    });
}

function createProcessSlide(title, steps) {
    const layoutCode = steps.length <= 4 ? `1+${steps.length}` : '1+4';
    return createSlideFromContent(layoutCode, {
        row1: { title: title },
        row2: steps.slice(0, 4)
    });
}

function createListSlide(title, items) {
    const layoutCode = items.length <= 3 ? '33' : '44';
    return createSlideFromContent(layoutCode, items.slice(0, 4));
}

// 전역으로 노출
window.TemplateRenderer = TemplateRenderer;
window.createSlideFromContent = createSlideFromContent;
window.createTitleSlide = createTitleSlide;
window.createComparisonSlide = createComparisonSlide;
window.createProcessSlide = createProcessSlide;
window.createListSlide = createListSlide;
