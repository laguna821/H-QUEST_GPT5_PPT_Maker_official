// presentation-data.js - JSON 데이터를 JavaScript 변수로 변환
const presentationDataJS = {
  "templates": {
    "one_row_layouts": {
      "layout_11": {
        "name": "1 Column Full Width",
        "code": "11",
        "description": "Single full-width card for title slides, quotes, or single message",
        "structure": {
          "row1": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[제목]",
              "subtitle": "[부제목]",
              "body": "[본문 내용]",
              "footer": "[하단 정보]"
            }]
          }
        }
      },
      "layout_22": {
        "name": "2 Columns Side by Side",
        "code": "22",
        "description": "Two equal columns for comparisons or dual content",
        "structure": {
          "row1": {
            "columns": 2,
            "content": [
              {
                "type": "column",
                "title": "[좌측 제목]",
                "body": "[좌측 내용]",
                "icon": "[아이콘]"
              },
              {
                "type": "column",
                "title": "[우측 제목]",
                "body": "[우측 내용]",
                "icon": "[아이콘]"
              }
            ]
          }
        }
      },
      "layout_33": {
        "name": "3 Columns Side by Side",
        "code": "33",
        "description": "Three equal columns for options, features, or steps",
        "structure": {
          "row1": {
            "columns": 3,
            "content": [
              {
                "type": "column",
                "title": "[컬럼1 제목]",
                "body": "[컬럼1 내용]",
                "icon": "[아이콘]"
              },
              {
                "type": "column",
                "title": "[컬럼2 제목]",
                "body": "[컬럼2 내용]",
                "icon": "[아이콘]"
              },
              {
                "type": "column",
                "title": "[컬럼3 제목]",
                "body": "[컬럼3 내용]",
                "icon": "[아이콘]"
              }
            ]
          }
        }
      },
      "layout_44": {
        "name": "4 Columns Side by Side",
        "code": "44",
        "description": "Four equal columns for multiple items or categories",
        "structure": {
          "row1": {
            "columns": 4,
            "content": [
              {
                "type": "column",
                "title": "[컬럼1]",
                "body": "[내용1]",
                "icon": "[아이콘]"
              },
              {
                "type": "column",
                "title": "[컬럼2]",
                "body": "[내용2]",
                "icon": "[아이콘]"
              },
              {
                "type": "column",
                "title": "[컬럼3]",
                "body": "[내용3]",
                "icon": "[아이콘]"
              },
              {
                "type": "column",
                "title": "[컬럼4]",
                "body": "[내용4]",
                "icon": "[아이콘]"
              }
            ]
          }
        }
      }
    },
    "two_row_layouts": {
      "layout_1_1": {
        "name": "Full Width + Full Width",
        "code": "1+1",
        "description": "Two full-width sections stacked",
        "structure": {
          "row1": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[상단 제목]",
              "body": "[상단 내용]"
            }]
          },
          "row2": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[하단 제목]",
              "body": "[하단 내용]"
            }]
          }
        }
      },
      "layout_1_2": {
        "name": "Full Width + 2 Columns",
        "code": "1+2",
        "description": "Full-width header with two columns below",
        "structure": {
          "row1": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[메인 제목]",
              "subtitle": "[부제목]"
            }]
          },
          "row2": {
            "columns": 2,
            "content": [
              {
                "type": "column",
                "title": "[좌측]",
                "body": "[내용]"
              },
              {
                "type": "column",
                "title": "[우측]",
                "body": "[내용]"
              }
            ]
          }
        }
      },
      "layout_1_3": {
        "name": "Full Width + 3 Columns",
        "code": "1+3",
        "description": "Full-width header with three columns below",
        "structure": {
          "row1": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[메인 제목]",
              "subtitle": "[설명]"
            }]
          },
          "row2": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[항목1]", "body": "[내용1]"},
              {"type": "column", "title": "[항목2]", "body": "[내용2]"},
              {"type": "column", "title": "[항목3]", "body": "[내용3]"}
            ]
          }
        }
      },
      "layout_1_4": {
        "name": "Full Width + 4 Columns",
        "code": "1+4",
        "description": "Full-width header with four columns below",
        "structure": {
          "row1": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[메인 제목]",
              "subtitle": "[설명]"
            }]
          },
          "row2": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[항목1]", "body": "[내용1]"},
              {"type": "column", "title": "[항목2]", "body": "[내용2]"},
              {"type": "column", "title": "[항목3]", "body": "[내용3]"},
              {"type": "column", "title": "[항목4]", "body": "[내용4]"}
            ]
          }
        }
      },
      "layout_2_1": {
        "name": "2 Columns + Full Width",
        "code": "2+1",
        "description": "Two columns above, full-width section below",
        "structure": {
          "row1": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[좌측]", "body": "[내용]"},
              {"type": "column", "title": "[우측]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[결론/요약]",
              "body": "[내용]"
            }]
          }
        }
      },
      "layout_2_2": {
        "name": "2 Columns + 2 Columns",
        "code": "2+2",
        "description": "Two rows of two columns each",
        "structure": {
          "row1": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[상단좌]", "body": "[내용]"},
              {"type": "column", "title": "[상단우]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[하단좌]", "body": "[내용]"},
              {"type": "column", "title": "[하단우]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_2_3": {
        "name": "2 Columns + 3 Columns",
        "code": "2+3",
        "description": "Two columns above, three columns below",
        "structure": {
          "row1": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[카테고리1]", "body": "[내용]"},
              {"type": "column", "title": "[카테고리2]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[세부1]", "body": "[내용]"},
              {"type": "column", "title": "[세부2]", "body": "[내용]"},
              {"type": "column", "title": "[세부3]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_2_4": {
        "name": "2 Columns + 4 Columns",
        "code": "2+4",
        "description": "Two columns above, four columns below",
        "structure": {
          "row1": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[주제1]", "body": "[내용]"},
              {"type": "column", "title": "[주제2]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[항목1]", "body": "[내용]"},
              {"type": "column", "title": "[항목2]", "body": "[내용]"},
              {"type": "column", "title": "[항목3]", "body": "[내용]"},
              {"type": "column", "title": "[항목4]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_3_1": {
        "name": "3 Columns + Full Width",
        "code": "3+1",
        "description": "Three columns above, full-width conclusion below",
        "structure": {
          "row1": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[옵션1]", "body": "[내용]"},
              {"type": "column", "title": "[옵션2]", "body": "[내용]"},
              {"type": "column", "title": "[옵션3]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[결론]",
              "body": "[요약 내용]"
            }]
          }
        }
      },
      "layout_3_2": {
        "name": "3 Columns + 2 Columns",
        "code": "3+2",
        "description": "Three columns above, two columns below",
        "structure": {
          "row1": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[단계1]", "body": "[내용]"},
              {"type": "column", "title": "[단계2]", "body": "[내용]"},
              {"type": "column", "title": "[단계3]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[결과1]", "body": "[내용]"},
              {"type": "column", "title": "[결과2]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_3_3": {
        "name": "3 Columns + 3 Columns",
        "code": "3+3",
        "description": "Two rows of three columns each",
        "structure": {
          "row1": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[상단1]", "body": "[내용]"},
              {"type": "column", "title": "[상단2]", "body": "[내용]"},
              {"type": "column", "title": "[상단3]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[하단1]", "body": "[내용]"},
              {"type": "column", "title": "[하단2]", "body": "[내용]"},
              {"type": "column", "title": "[하단3]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_3_4": {
        "name": "3 Columns + 4 Columns",
        "code": "3+4",
        "description": "Three columns above, four columns below",
        "structure": {
          "row1": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[카테고리1]", "body": "[내용]"},
              {"type": "column", "title": "[카테고리2]", "body": "[내용]"},
              {"type": "column", "title": "[카테고리3]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[세부1]", "body": "[내용]"},
              {"type": "column", "title": "[세부2]", "body": "[내용]"},
              {"type": "column", "title": "[세부3]", "body": "[내용]"},
              {"type": "column", "title": "[세부4]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_4_1": {
        "name": "4 Columns + Full Width",
        "code": "4+1",
        "description": "Four columns above, full-width summary below",
        "structure": {
          "row1": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[항목1]", "body": "[내용]"},
              {"type": "column", "title": "[항목2]", "body": "[내용]"},
              {"type": "column", "title": "[항목3]", "body": "[내용]"},
              {"type": "column", "title": "[항목4]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 1,
            "content": [{
              "type": "full-width",
              "title": "[요약]",
              "body": "[전체 정리]"
            }]
          }
        }
      },
      "layout_4_2": {
        "name": "4 Columns + 2 Columns",
        "code": "4+2",
        "description": "Four columns above, two columns below",
        "structure": {
          "row1": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[옵션1]", "body": "[내용]"},
              {"type": "column", "title": "[옵션2]", "body": "[내용]"},
              {"type": "column", "title": "[옵션3]", "body": "[내용]"},
              {"type": "column", "title": "[옵션4]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 2,
            "content": [
              {"type": "column", "title": "[선택1]", "body": "[내용]"},
              {"type": "column", "title": "[선택2]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_4_3": {
        "name": "4 Columns + 3 Columns",
        "code": "4+3",
        "description": "Four columns above, three columns below",
        "structure": {
          "row1": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[특징1]", "body": "[내용]"},
              {"type": "column", "title": "[특징2]", "body": "[내용]"},
              {"type": "column", "title": "[특징3]", "body": "[내용]"},
              {"type": "column", "title": "[특징4]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 3,
            "content": [
              {"type": "column", "title": "[이점1]", "body": "[내용]"},
              {"type": "column", "title": "[이점2]", "body": "[내용]"},
              {"type": "column", "title": "[이점3]", "body": "[내용]"}
            ]
          }
        }
      },
      "layout_4_4": {
        "name": "4 Columns + 4 Columns",
        "code": "4+4",
        "description": "Two rows of four columns each",
        "structure": {
          "row1": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[상단1]", "body": "[내용]"},
              {"type": "column", "title": "[상단2]", "body": "[내용]"},
              {"type": "column", "title": "[상단3]", "body": "[내용]"},
              {"type": "column", "title": "[상단4]", "body": "[내용]"}
            ]
          },
          "row2": {
            "columns": 4,
            "content": [
              {"type": "column", "title": "[하단1]", "body": "[내용]"},
              {"type": "column", "title": "[하단2]", "body": "[내용]"},
              {"type": "column", "title": "[하단3]", "body": "[내용]"},
              {"type": "column", "title": "[하단4]", "body": "[내용]"}
            ]
          }
        }
      }
    }
  },
  "brand_guidelines": {
    "H_QUEST_colors": {
      "h1": "#023373",      // deep navy for H1
      "hx": "#0477BF",      // headings H2-H6
      "body": "#111111",    // near-black body copy
      "gray": "#505050",    // captions, small text
      "accent": "#04BFAD"   // charts, inline highlights, UI
    },
    "colors": {
      "primary": "#023373",
      "secondary": "#0477BF", 
      "accent": "#04BFAD",
      "success": "#22c55e",
      "warning": "#f59e0b",
      "error": "#ef4444"
    },
    "typography": {
      "font_family": "Pretendard Variable",
      "weights": {
        "light": 300,
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      },
      "minor_second_scale": {
        "h1": "2.58rem",
        "h2": "2.42rem",
        "h3": "2.27rem",
        "h4": "2.13rem",
        "h5": "1.99rem",
        "h6": "1.87rem",
        "base": "1.75rem",
        "sm": "1.64rem",
        "xs": "1.54rem"
      }
    },
    "spacing": {
      "unit": "8px",
      "card_padding": "16px",
      "scale": [8, 16, 24, 32, 48, 64]
    },
    "border_radius": {
      "sm": "12px",
      "default": "16px",
      "lg": "20px",
      "xl": "24px"
    },
    "shadows": {
      "card": "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
      "card_hover": "0 8px 40px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)"
    }
  },
  "responsive_breakpoints": {
    "mobile": "max-width: 768px",
    "tablet": "min-width: 769px and max-width: 1023px", 
    "desktop": "min-width: 1024px"
  }
};
