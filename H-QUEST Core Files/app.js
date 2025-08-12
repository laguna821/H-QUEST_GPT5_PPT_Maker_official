// 전역 변수
let currentSlideIndex = 0;
let totalSlides = 0;
let slides = [];
let isTransitioning = false;

// 템플릿 렌더러 초기화
let templateRenderer;
let presentationData;

// presentation-data.json 로드
async function loadPresentationData() {
    try {
        console.log('presentation data 로드 시작');
        
        // JSON 파일 대신 전역 변수 사용 (로컬 테스트용)
        if (typeof presentationDataJS !== 'undefined') {
            presentationData = presentationDataJS;
            console.log('JavaScript 변수에서 데이터 로드');
        } else {
            // 서버 환경에서는 JSON 파일 로드
            const response = await fetch('presentation-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            presentationData = await response.json();
            console.log('JSON 파일에서 데이터 로드');
        }
        
        templateRenderer = new TemplateRenderer(presentationData);
        
        // 전역 함수 노출
        window.templateRenderer = templateRenderer;
        window.addSlideWithTemplate = addSlideWithTemplate;
        window.addSlideAutoLayout = addSlideAutoLayout;
        window.createTitleSlide = createTitleSlide;
        window.createComparisonSlide = createComparisonSlide;
        window.createProcessSlide = createProcessSlide;
        window.createListSlide = createListSlide;
        window.createMatrixSlide = createMatrixSlide;
        
        console.log('템플릿 렌더러 초기화 완료');
        return true;
    } catch (error) {
        console.error('Failed to load presentation data:', error);
        return false;
    }
}

// 슬라이드 초기화
function initializeSlides() {
    const slidesContainer = document.getElementById('slidesContainer') || document.querySelector('.slides-container');
    if (!slidesContainer) {
        console.error('Slides container not found');
        return;
    }
    
    slides = slidesContainer.querySelectorAll('.slide');
    totalSlides = slides.length;
    
    if (totalSlides > 0) {
        slides[0].classList.add('active');
        updateSlideCounter();
        updateProgressBar();
        updateNavigationButtons();
        createSlideDots();
        
        // 모바일에서 스크롤 가능하도록 강제
        if (window.innerWidth <= 768) {
            ensureScrollable(slides[0]);
        }
        
        // 애니메이션 트리거
        setTimeout(() => {
            triggerSlideAnimations(slides[0]);
        }, 100);
    }
    
    // 전체 슬라이드 수 업데이트
    const totalSlidesElement = document.getElementById('totalSlides');
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
    
    // 슬라이드 카운터 업데이트
    updateSlideCounterDisplay();
    
    // 모바일에서 스와이프 힌트 표시
    if (window.innerWidth <= 768) {
        showSwipeHint();
    }
    
    // 화면 크기에 따른 최적화
    optimizeForScreenSize();
}

// 스크롤 가능 확인 및 강제 함수
function ensureScrollable(slide) {
    // 슬라이드의 내부 콘텐츠가 컨테이너보다 작으면 강제로 늘림
    const slideInner = slide.querySelector('.slide-inner');
    if (slideInner) {
        // min-height 해킹 제거 - 더 이상 필요 없음
        slideInner.style.minHeight = '100%';
    }
    
    // scrollTop = 1 제거 - 상단 숨김 버그의 원인
    // setTimeout(() => {
    //     slide.scrollTop = 1;
    // }, 50);
}

// 슬라이드 변경
function changeSlide(direction) {
    if (totalSlides === 0 || isTransitioning) return;
    
    const newIndex = currentSlideIndex + direction;
    
    if (newIndex < 0 || newIndex >= totalSlides) {
        // 끝에 도달했을 때 바운스 효과
        bounceEffect(direction);
        return;
    }
    
    isTransitioning = true;
    
    slides[currentSlideIndex].classList.remove('active');
    if (direction > 0) {
        slides[currentSlideIndex].classList.add('prev');
    }
    
    currentSlideIndex = newIndex;
    
    setTimeout(() => {
        slides.forEach(slide => slide.classList.remove('prev'));
        slides[currentSlideIndex].classList.add('active');
        updateSlideCounter();
        updateProgressBar();
        updateNavigationButtons();
        isTransitioning = false;
        
        // 모바일에서 새 슬라이드로 이동 시 스크롤 보장
        if (window.innerWidth <= 768) {
            ensureScrollable(slides[currentSlideIndex]);
        }
        
        // 새 슬라이드 애니메이션
        triggerSlideAnimations(slides[currentSlideIndex]);
    }, 50);
}

// 슬라이드 애니메이션 트리거
function triggerSlideAnimations(slide) {
    const animatedElements = slide.querySelectorAll('.column-2, .column-3, .column-4, .full-width-content');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// 바운스 효과
function bounceEffect(direction) {
    const currentSlide = slides[currentSlideIndex];
    currentSlide.style.transform = `translateX(${direction > 0 ? '-5%' : '5%'})`;
    setTimeout(() => {
        currentSlide.style.transform = 'translateX(0)';
    }, 200);
}

// 특정 슬라이드로 이동
function goToSlide(index) {
    if (index >= 0 && index < totalSlides && index !== currentSlideIndex && !isTransitioning) {
        const direction = index > currentSlideIndex ? 1 : -1;
        currentSlideIndex = index - direction;
        changeSlide(direction);
    }
}

// HTML의 previousSlide/nextSlide 함수와 연결
function previousSlide() {
    changeSlide(-1);
}

function nextSlide() {
    changeSlide(1);
}

// 슬라이드 도트 생성
function createSlideDots() {
    const dotsContainer = document.getElementById('slideDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    // 많은 슬라이드일 때는 도트 수 제한
    const maxDots = 10;
    const showAllDots = totalSlides <= maxDots;
    
    if (showAllDots) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = createDot(i);
            dotsContainer.appendChild(dot);
        }
    } else {
        // 현재 슬라이드 주변의 도트만 표시
        const range = 2;
        const start = Math.max(0, currentSlideIndex - range);
        const end = Math.min(totalSlides - 1, currentSlideIndex + range);
        
        if (start > 0) {
            dotsContainer.appendChild(createDot(0));
            if (start > 1) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'dots-ellipsis';
                dotsContainer.appendChild(ellipsis);
            }
        }
        
        for (let i = start; i <= end; i++) {
            const dot = createDot(i);
            dotsContainer.appendChild(dot);
        }
        
        if (end < totalSlides - 1) {
            if (end < totalSlides - 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'dots-ellipsis';
                dotsContainer.appendChild(ellipsis);
            }
            dotsContainer.appendChild(createDot(totalSlides - 1));
        }
    }
}

function createDot(index) {
    const dot = document.createElement('button');
    dot.className = 'slide-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.onclick = () => goToSlide(index);
    
    if (index === currentSlideIndex) {
        dot.classList.add('active');
    }
    
    return dot;
}

// 슬라이드 도트 업데이트
function updateSlideDots() {
    if (totalSlides > 10) {
        createSlideDots(); // 많은 슬라이드일 때는 재생성
    } else {
        const dots = document.querySelectorAll('.slide-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// UI 업데이트 함수들
function updateSlideCounter() {
    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlideIndex + 1;
    }
    updateSlideCounterDisplay();
}

function updateSlideCounterDisplay() {
    const counterElement = document.getElementById('slideCounter');
    if (counterElement) {
        counterElement.textContent = `${currentSlideIndex + 1}/${totalSlides}`;
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill') || document.querySelector('.progress-bar');
    if (progressFill) {
        const progress = totalSlides > 1 ? (currentSlideIndex / (totalSlides - 1)) * 100 : 100;
        progressFill.style.width = progress + '%';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = (currentSlideIndex === 0);
    nextBtn.disabled = (currentSlideIndex === totalSlides - 1);
    
    // 슬라이드 도트도 업데이트
    updateSlideDots();
}

// 스와이프 힌트 표시
function showSwipeHint() {
    const swipeHint = document.getElementById('swipeHint');
    if (swipeHint) {
        swipeHint.style.display = 'block';
        setTimeout(() => {
            swipeHint.style.opacity = '0';
            setTimeout(() => {
                swipeHint.style.display = 'none';
            }, 300);
        }, 3000);
    }
}

// 전체화면 토글
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// 화면 크기 최적화
function optimizeForScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // 화면 비율에 따른 조정
    if (width / height > 2) {
        // 매우 와이드한 화면
        document.body.classList.add('ultra-wide');
    } else if (width / height < 0.6) {
        // 매우 세로로 긴 화면
        document.body.classList.add('ultra-tall');
    }
    
    // 모바일 여부
    if (width <= 768) {
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}

// 키보드 이벤트
document.addEventListener('keydown', function(e) {
    if (isTransitioning) return;
    
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            changeSlide(-1);
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            changeSlide(1);
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
        case 'f':
        case 'F11':
            e.preventDefault();
            toggleFullscreen();
            break;
    }
});

// 터치 이벤트 - 개선된 버전
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let touchStartTime = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchend', function(e) {
    if (isTransitioning) return;
    
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const timeThreshold = 300;
    const velocityThreshold = 0.3;
    
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    const timeDiff = Date.now() - touchStartTime;
    const velocity = Math.abs(diffX) / timeDiff;
    
    // 세로 스와이프가 더 크면 무시 (스크롤)
    if (diffY > Math.abs(diffX)) return;
    
    if (Math.abs(diffX) > swipeThreshold && 
        timeDiff < timeThreshold && 
        velocity > velocityThreshold) {
        
        if (diffX > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    }
}

// 슬라이드 추가 함수들
function addSlide(content, slideClass = '') {
    const slidesContainer = document.getElementById('slidesContainer');
    const slideDiv = document.createElement('div');
    slideDiv.className = `slide ${slideClass}`;
    slideDiv.innerHTML = content;
    slidesContainer.appendChild(slideDiv);
    
    initializeSlides();
}

// 템플릿을 사용한 슬라이드 추가
function addSlideWithTemplate(layoutCode, contentData) {
    if (!templateRenderer) {
        console.error('Template renderer not initialized');
        return;
    }
    
    const slideHTML = templateRenderer.renderSlide(layoutCode, contentData);
    const slidesContainer = document.getElementById('slidesContainer') || document.querySelector('.slides-container');
    
    if (slidesContainer) {
        slidesContainer.insertAdjacentHTML('beforeend', slideHTML);
        initializeSlides();
    }
}

// 자동 레이아웃 추천을 사용한 슬라이드 추가
function addSlideAutoLayout(content) {
    if (!templateRenderer) {
        console.error('Template renderer not initialized');
        return;
    }
    
    const recommendedLayout = templateRenderer.recommendLayout(content);
    addSlideWithTemplate(recommendedLayout, content);
}

// 사용 예시 함수들 - 확장된 버전
function createTitleSlide(title, subtitle, body) {
    addSlideWithTemplate('11', {
        title: title,
        subtitle: subtitle,
        body: body,
        footer: new Date().toLocaleDateString('ko-KR')
    });
}

function createComparisonSlide(title, items) {
    const layoutCode = items.length <= 2 ? '22' : items.length === 3 ? '33' : '44';
    if (title) {
        addSlideWithTemplate(`1+${items.length}`, {
            row1: { title: title },
            row2: items
        });
    } else {
        addSlideWithTemplate(layoutCode, items);
    }
}

function createProcessSlide(title, steps) {
    const maxSteps = 4;
    if (steps.length <= maxSteps) {
        addSlideWithTemplate(`1+${steps.length}`, {
            row1: { title: title },
            row2: steps
        });
    } else {
        // 여러 슬라이드로 분할
        for (let i = 0; i < steps.length; i += maxSteps) {
            const slideSteps = steps.slice(i, i + maxSteps);
            const slideTitle = i === 0 ? title : `${title} (계속)`;
            addSlideWithTemplate(`1+${slideSteps.length}`, {
                row1: { title: slideTitle },
                row2: slideSteps
            });
        }
    }
}

function createListSlide(title, items, columns = 3) {
    const layoutCode = `${columns}${columns}`;
    if (items.length <= columns) {
        addSlideWithTemplate(layoutCode, items);
    } else {
        // 여러 슬라이드로 분할
        for (let i = 0; i < items.length; i += columns) {
            const slideItems = items.slice(i, i + columns);
            addSlideWithTemplate(layoutCode, slideItems);
        }
    }
}

function createMatrixSlide(title, items) {
    if (items.length === 4) {
        addSlideWithTemplate('2+2', {
            row1: items.slice(0, 2),
            row2: items.slice(2, 4)
        });
    } else if (items.length === 6) {
        addSlideWithTemplate('3+3', {
            row1: items.slice(0, 3),
            row2: items.slice(3, 6)
        });
    } else if (items.length === 8) {
        addSlideWithTemplate('4+4', {
            row1: items.slice(0, 4),
            row2: items.slice(4, 8)
        });
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', async function() {
    // presentation-data.json 로드
    await loadPresentationData();
    
    // 슬라이드 초기화
    initializeSlides();
    
    // 터치 디바이스 감지
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // 화면 크기 최적화
    optimizeForScreenSize();
});

// 창 크기 변경 대응
window.addEventListener('resize', function() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // 화면 크기 재최적화
    optimizeForScreenSize();
});

// 초기 뷰포트 설정
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// 유틸리티 함수들
function analyzeTextDensity(content) {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    
    if (wordCount > 150) {
        return {
            recommendation: 'split',
            layout: 'multi-slide-series',
            visualSupport: 'diagram'
        };
    } else if (wordCount < 50) {
        return {
            recommendation: 'enhance',
            layout: 'visual-focused',
            visualSupport: 'infographic'
        };
    }
    
    return {
        recommendation: 'optimize',
        layout: 'balanced',
        visualSupport: 'icons'
    };
}

function suggestVisualization(content) {
    const patterns = {
        comparison: /비교|대조|vs|대비/i,
        process: /단계|과정|흐름|절차/i,
        data: /[0-9]+%|통계|수치|데이터/i,
        timeline: /년도|시간|기간|역사/i,
        hierarchy: /구조|조직|계층|분류/i
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(content)) {
            return type;
        }
    }
    
    return 'default';
}

function createIcon(type) {
    const icons = {
        data: '📊',
        example: '💡',
        authority: '🎓',
        process: '⚙️',
        timeline: '📅',
        comparison: '⚖️',
        insight: '🔍',
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️',
        question: '❓'
    };
    return icons[type] || '•';
}

function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('Global error:', e);
});
