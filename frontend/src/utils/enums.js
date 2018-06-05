const WEB_SOCKET_URL = 'http://localhost:8080/ws';

const INPUT_EMAIL = 'email';

const INPUT_PASSWORD = 'password';

const INPUT_CONFIRM_PASSWORD = 'confirmPassword';

const INPUT_NAME = 'name';

const INPUT_DESCRIPTION = 'description';

const INPUT_STATUS = 'status';

const ICONS = {
  PROJECT: ['M554.667 85.333l-469.333 85.333v682.667l469.333 85.333h42.667v-853.333h-42.667zM640 213.333v128h170.667v128h64l-85.333 85.333-85.333-85.333h64v-85.333h-128v149.333l106.667 106.667-106.667 106.667v64h298.667v-597.333h-298.667zM321.333 337.333c104.875-9.301 117.333 68.245 117.333 109.333s-28.629 123.264-122.667 117.333l-34.667-1.333 1.333 117.333-69.333-8v-321.333l108-13.333zM308 398.667l-28 1.333 1.333 105.333h28c40.405-0.128 61.632-18.325 61.333-56-0.256-36.864-22.261-53.739-62.667-50.667z'],
  SEARCH: ['M947.863 924.25l-162.093-178.778c64.971-78.45 104.388-180.12 104.388-290.996 0-0.233-0-0.467-0.001-0.7l0 0.037c-4.734-242.255-202.235-436.826-445.179-436.826-245.91 0-445.259 199.349-445.259 445.259s199.349 445.259 445.259 445.259c0.014 0 0.028-0 0.043-0l-0.002 0c0.217 0 0.474 0.001 0.731 0.001 95.501 0 183.813-30.783 255.554-82.967l-1.249 0.866 164.081 180.706c10.479 11.17 25.333 18.128 41.812 18.128 15.711 0 29.944-6.325 40.293-16.567l-0.005 0.005c10.881-10.897 17.61-25.943 17.61-42.56 0-15.791-6.077-30.164-16.019-40.906l0.036 0.040zM445.018 118.423c1.882-0.038 4.101-0.060 6.325-0.060 185.231 0 335.39 150.159 335.39 335.39s-150.159 335.39-335.39 335.39c-185.21 0-335.356-150.125-335.39-335.327l-0-0.003c-0.007-0.811-0.011-1.77-0.011-2.73 0-182.467 146.899-330.624 328.884-332.658l0.192-0.002z'],
  ANGLE_DOWN: ['M1722.18 162.84l-162.898-162.891-698.195 698.094-698.195-698.094-162.891 162.891 861.133 861.109z'],
  USER: ['M0 512c0 282.77 229.23 512 512 512s512-229.23 512-512c0-282.77-229.23-512-512-512v0c-282.621 0.371-511.629 229.379-512 511.964l-0 0.036zM512 51.2c0.074-0 0.161-0 0.248-0 254.21 0 460.288 206.078 460.288 460.288 0 121.808-47.315 232.565-124.569 314.895l0.23-0.248c-46.728-32.574-100.731-65.138-156.838-94.202l-8.212-3.869v-57.53c6.585-14.113 12.353-30.707 16.442-47.952l0.361-1.805c26.94-17.54 45.353-46.232 48.696-79.374l0.037-0.452c5.881-12.58 9.313-27.314 9.313-42.85 0-18.168-4.693-35.24-12.933-50.070l0.269 0.527c15.313-84.201 8.378-146.385-20.806-184.832-11.069-15.128-26.453-26.51-44.331-32.402l-0.631-0.18c-14.572-19.785-32.951-35.888-54.156-47.465l-0.861-0.43c-28.975-17.146-63.859-27.277-101.109-27.277-7.143 0-14.199 0.373-21.149 1.099l0.868-0.074c-17.987 0.884-34.895 4.223-50.812 9.694l1.288-0.385c-20.102 7.027-37.527 16.112-53.356 27.304l0.666-0.447c-19.841 12.809-37.054 27.093-52.397 43.175l-0.106 0.112c-27.9 27.433-48.399 62.31-58.28 101.413l-0.321 1.499c-4.232 15.179-6.664 32.609-6.664 50.607 0 14.504 1.58 28.64 4.576 42.244l-0.24-1.296c-2.925 2.177-5.476 4.595-7.715 7.283l-0.058 0.071c-8.306 14.278-13.208 31.424-13.208 49.714 0 15.411 3.48 30.009 9.698 43.051l-0.26-0.605c5.41 29.117 18.989 54.426 38.243 74.177l-0.029-0.030c5.612 28.93 15.004 54.686 27.801 78.33l-0.711-1.437v46.545c-64.389 33.042-118.388 65.603-170.030 101.33l4.979-3.258c-77.012-82.053-124.32-192.779-124.32-314.554 0-254.106 205.993-460.1 460.098-460.102l0.001-0z'],
  HOME: ['M1024 608l-192-192v-288h-128v160l-192-192-512 512v32h128v320h320v-192h128v192h320v-320h128z'],
  BACKLOG: [
    'M302.080 25.6c-8.704 8.704-10.24 16.896-10.24 58.88 0 26.624-2.048 48.64-4.608 48.64-3.584 0-131.584-45.568-165.376-58.88-8.192-3.072-9.216 0-9.216 27.648v31.232h-29.696c-16.384 0-32.256 2.56-35.84 6.144-4.608 4.608-6.144 94.72-6.144 373.76v367.616l13.312 5.12c7.168 3.072 63.488 5.12 125.44 5.12h112.128v47.616c0 43.52 1.024 49.152 11.776 58.88l11.776 11.264h276.48c313.856 0 314.368 0 350.72-36.352 31.744-31.744 36.864-48.128 39.424-128.512 1.024-38.912 0.512-76.288-1.024-82.944-7.68-30.208 10.24-28.672-344.064-28.672-383.488 0-345.088-7.68-345.088 69.12v48.64h-209.92v-675.84h15.36c15.36 0 15.36 0.512 15.36 28.16 0 18.944 2.048 28.16 6.656 28.16 3.072 0 43.008-13.824 88.064-30.208l81.92-30.208 1.536 49.664c1.024 41.472 3.072 50.688 12.288 60.416l10.752 11.776h294.912c274.944 0 296.448-1.024 315.392-9.728 25.6-11.264 46.592-35.328 53.76-60.928 2.56-10.24 5.12-54.272 5.12-97.28 0-75.776-3.072-95.232-17.408-104.448-3.072-2.048-151.552-4.096-329.216-4.096-317.44 0-324.096 0-334.336 10.24zM911.36 144.384c0 46.080-1.536 58.88-8.704 66.56-7.68 8.704-23.040 9.216-273.92 9.216h-265.216v-133.12h547.84v57.344zM911.36 847.36c0 29.184-2.56 49.152-7.68 58.88-15.872 31.232-13.312 30.72-289.28 30.72h-250.88v-133.12h547.84v43.52z',
    'M302.080 384c-9.728 9.728-10.24 16.896-10.24 126.976 0 115.712 0 117.248 11.776 128l11.776 11.264h279.040c306.176 0 306.176 0 343.552-30.72 33.28-27.648 41.984-53.76 44.032-134.144 1.536-38.912 0.512-76.288-1.024-82.944-7.68-30.208 10.24-28.672-344.064-28.672-317.952 0-324.608 0-334.848 10.24zM911.36 488.96c0 29.184-2.56 49.152-7.68 58.88-15.872 31.232-13.312 30.72-289.28 30.72h-250.88v-133.12h547.84v43.52z'
  ],
  SPRINT: [
    'M461.824 103.424l-52.224 52.736 107.52 107.52v-22.016c0-11.776 0.512-21.504 1.536-21.504 11.264 0 64 19.968 88.064 33.28 43.008 23.552 74.752 53.248 101.376 93.696 70.656 107.008 69.12 232.96-4.608 337.408-40.448 56.832-98.304 96.256-168.448 114.176-37.376 9.728-56.832 10.24-287.744 10.24-135.68 0-247.296 2.048-247.296 4.096s11.776 15.36 25.6 29.184l25.6 25.088-25.6 26.112c-13.824 14.336-25.6 27.648-25.6 29.696 0 2.56 121.344 3.072 270.336 2.56 299.008-2.048 292.352-1.536 369.152-37.888 112.64-52.736 187.392-140.288 223.744-261.632 11.776-38.4 13.824-54.784 13.824-111.616 0.512-70.656-5.12-102.912-29.184-162.304-37.888-93.696-112.128-171.008-208.384-216.064-38.4-18.432-89.088-33.792-110.592-33.792-9.728 0-11.264-3.072-12.8-25.6l-1.536-26.112-52.736 52.736z',
    'M376.32 105.984c-156.16 33.28-281.088 156.16-317.952 312.832-5.12 20.48-8.192 57.856-8.192 93.184-0.512 84.992 15.872 144.384 59.392 216.064l20.992 34.816h82.944c46.080 0 83.456-1.536 83.456-4.096 0-2.048-10.24-11.264-23.040-20.48-12.288-9.216-31.232-29.184-42.496-43.52-106.496-139.776-74.752-333.824 71.168-430.592 29.696-19.456 90.624-43.52 111.104-44.032 6.144 0 11.264-1.536 11.264-3.584s-12.8-16.384-28.16-32.256l-28.16-28.672 25.6-25.088c24.064-23.552 30.72-33.792 22.016-32.768-2.56 0-19.968 3.584-39.936 8.192z',
    'M921.6 784.896v24.064h-105.472l-27.648 28.672c-15.36 15.872-48.64 41.984-73.728 58.88l-46.080 30.208h252.928v48.64l51.2-51.2c28.16-28.16 51.2-53.248 51.2-56.32s-23.040-28.16-51.2-56.32l-51.2-51.2v24.576z'
  ],
  SUMMARY: [
    'M848 0h-672c-44.112 0-80 35.888-80 80v864c0 44.112 35.888 80 80 80h672c44.112 0 80-35.888 80-80v-864c0-44.112-35.888-80-80-80zM896 944c0 26.466-21.532 48-48 48h-672c-26.468 0-48-21.534-48-48v-864c0-26.466 21.532-48 48-48h672c26.468 0 48 21.534 48 48v864z',
    'M416 208h288c8.836 0 16-7.164 16-16s-7.164-16-16-16h-288c-8.836 0-16 7.164-16 16s7.164 16 16 16z',
    'M816 240h-400c-8.836 0-16 7.164-16 16s7.164 16 16 16h400c8.836 0 16-7.164 16-16s-7.164-16-16-16z',
    'M416 336h352c8.836 0 16-7.164 16-16s-7.164-16-16-16h-352c-8.836 0-16 7.164-16 16s7.164 16 16 16z',
    'M336 688h-128c-8.836 0-16 7.164-16 16v128c0 8.836 7.164 16 16 16h128c8.836 0 16-7.164 16-16v-128c0-8.836-7.164-16-16-16zM320 816h-96v-96h96v96z',
    'M416 720h288c8.836 0 16-7.164 16-16s-7.164-16-16-16h-288c-8.836 0-16 7.164-16 16s7.164 16 16 16z',
    'M816 752h-400c-8.836 0-16 7.164-16 16s7.164 16 16 16h400c8.836 0 16-7.164 16-16s-7.164-16-16-16z',
    'M768 816h-352c-8.836 0-16 7.164-16 16s7.164 16 16 16h352c8.836 0 16-7.164 16-16s-7.164-16-16-16z',
    'M336 432h-128c-8.836 0-16 7.164-16 16v128c0 8.836 7.164 16 16 16h128c8.836 0 16-7.164 16-16v-128c0-8.836-7.164-16-16-16zM320 560h-96v-96h96v96z',
    'M416 464h288c8.836 0 16-7.164 16-16s-7.164-16-16-16h-288c-8.836 0-16 7.164-16 16s7.164 16 16 16z',
    'M816 496h-400c-8.836 0-16 7.164-16 16s7.164 16 16 16h400c8.836 0 16-7.164 16-16s-7.164-16-16-16z',
    'M416 592h352c8.836 0 16-7.164 16-16s-7.164-16-16-16h-352c-8.836 0-16 7.164-16 16s7.164 16 16 16z',
    'M356.686 148.686l-27.314 27.314h-73.372c-8.836 0-16 7.164-16 16s7.164 16 16 16h41.372l-41.372 41.372-52.686-52.686c-6.248-6.246-16.378-6.246-22.626 0-6.25 6.25-6.25 16.378 0 22.628l11.312 11.314v89.372c0 8.836 7.164 16 16 16h128c8.836 0 16-7.164 16-16v-48.004c0-8.836-7.164-16-16-16s-16 7.164-16 16v32.004h-96v-41.372l20.686 20.686c3.124 3.124 7.218 4.686 11.314 4.686s8.19-1.562 11.314-4.686l112-112c6.25-6.25 6.25-16.378 0-22.628-6.248-6.246-16.38-6.246-22.628 0z'
  ],
  ISSUES: [
    'M604.672 84.992c-35.328 9.216-79.872 33.28-103.936 55.296l-18.432 17.408-18.432-15.36c-19.456-15.872-20.48-15.872-50.176 7.168-18.432 14.336-18.944 14.336-36.864 6.144-12.8-6.144-18.944-13.312-20.992-23.552-1.536-7.68-4.096-21.504-5.632-29.696l-3.072-15.36h-90.624l-3.584 30.208c-3.072 29.184-4.096 30.208-22.528 37.888-18.944 7.168-19.968 7.168-45.568-10.752l-26.112-18.432-30.72 30.208c-16.896 16.896-30.72 32.768-30.72 35.84 0 2.56 8.192 15.36 17.408 27.648 16.896 22.528 16.896 22.528 8.704 41.472-7.68 18.432-9.728 19.456-38.912 23.552l-30.72 4.608v92.16l30.72 4.608c29.184 4.096 31.232 5.12 38.912 23.552 8.192 18.944 8.192 18.944-8.704 41.472-9.216 12.288-17.408 25.088-17.408 27.648 0 3.072 13.824 18.944 30.72 35.84l30.72 30.208 26.112-18.432c25.6-17.92 26.624-17.92 45.568-10.752 18.432 7.68 19.456 8.704 22.528 37.888l3.584 30.208h90.624l3.072-15.36c1.536-8.704 4.096-22.016 5.632-29.696 2.048-10.24 8.192-17.408 20.992-23.040 17.408-8.704 17.408-8.704 43.52 10.24l25.6 18.432 24.576-24.064 24.576-24.576 23.040 17.408c60.416 46.080 153.6 60.928 222.208 34.816 7.68-3.072 14.336-4.608 14.848-4.096 0.512 1.024 5.12 8.704 9.216 17.408l8.192 15.872-23.040 10.752-22.528 11.264 8.704 17.92c4.608 9.728 10.24 17.92 12.8 17.92 9.216 0 116.736-56.832 116.736-61.952 0-2.56-3.584-11.776-7.68-20.48l-8.192-14.848-19.968 10.24c-26.112 13.312-28.16 13.312-36.352-5.632-6.144-15.36-5.632-16.896 8.704-26.624 29.184-20.48 58.88-56.832 77.824-95.232 18.944-37.888 18.944-39.424 18.944-99.84 0-60.928-0.512-62.464-19.456-102.4-32.256-68.096-91.648-116.736-162.816-133.632-40.448-9.216-75.776-9.216-111.616 0.512zM323.584 144.384c3.584 27.136 7.168 34.816 15.872 34.816 3.584 0 17.92 5.632 32.768 12.288l26.624 12.8 22.528-17.408c19.968-15.36 23.552-16.384 30.208-9.216 7.168 6.656 6.656 10.752-6.656 36.352-36.352 73.216-33.792 148.48 8.192 224.256l18.432 34.304-11.264 11.776c-14.336 15.36-15.872 15.36-40.96-3.072l-20.992-14.848-25.088 12.288c-13.312 7.168-28.16 12.8-32.256 12.8-10.24 0-13.824 6.656-17.408 34.816-3.584 22.528-4.608 24.064-19.968 25.6s-15.872 0.512-19.456-20.48c-5.12-34.304-7.68-39.936-17.408-39.936-5.12 0-19.968-5.632-33.792-12.288l-24.576-12.8-22.528 15.872c-22.016 14.848-23.040 14.848-32.768 6.144-12.8-11.776-12.288-14.848 5.632-37.888l15.872-19.968-10.752-16.896c-5.632-9.216-12.8-25.088-15.36-35.328-5.12-17.92-6.144-18.944-33.28-22.528-27.648-3.072-28.16-3.584-28.16-20.48s0.512-17.408 28.16-20.48c26.624-3.584 28.16-4.608 33.792-22.528 3.072-10.24 10.24-26.112 15.36-35.328l9.728-17.408-15.36-19.456c-17.92-23.040-18.432-26.112-5.632-37.888 9.728-8.704 10.752-8.704 32.768 6.144l22.528 15.872 24.576-12.8c13.824-6.656 28.672-12.288 33.792-12.288 9.728 0 12.288-5.632 17.408-39.936 3.584-20.992 4.096-22.016 19.456-20.48s16.384 3.072 19.968 25.6zM694.272 128.512c62.976 11.264 117.76 53.76 144.384 111.104 12.288 25.6 13.824 35.328 13.824 80.384-0.512 46.080-2.048 54.272-15.36 81.92-18.944 38.912-55.808 76.288-93.696 93.696-25.6 12.288-35.328 13.824-82.944 13.824-48.128 0-56.832-1.536-81.92-13.824-15.36-7.68-36.864-22.016-47.616-31.232-17.408-16.384-18.432-18.944-13.312-33.28 5.632-16.896 10.752-18.944 59.904-24.576l31.744-3.584v-65.536c0-64.512-0.512-66.048-11.264-66.048-6.144 0-25.088-2.56-41.984-5.632l-31.232-5.12-11.264-28.16-11.264-28.672 23.040-23.040c31.744-31.744 76.8-51.2 133.12-57.344 3.072 0 18.944 2.048 35.84 5.12zM481.28 286.72c0 13.312 7.68 16.896 46.080 23.040l33.28 5.12v46.080l-37.376 5.12c-21.504 3.072-38.912 8.192-41.472 12.288-7.168 11.776-17.408-48.128-13.312-79.36 3.072-25.6 12.8-34.816 12.8-12.288z',
    'M270.336 232.448c-29.184 10.752-43.52 21.504-58.88 44.544-30.208 46.080-15.872 116.224 30.72 146.944 17.92 11.776 26.112 13.824 59.904 13.824 34.816 0 41.472-1.536 60.416-14.848 31.232-21.504 49.664-60.928 45.568-98.304-2.048-18.432-7.68-35.84-15.872-48.64-25.6-38.4-81.92-58.368-121.856-43.52zM335.872 269.312c23.552 11.264 38.912 37.376 38.912 67.072 0 40.448-31.232 70.656-72.704 70.656-40.96 0-73.216-31.232-73.216-70.656 0-56.832 55.808-91.648 107.008-67.072z',
    'M645.12 162.304c0 14.336 1.536 15.872 22.016 18.944 66.048 10.24 131.072 73.728 131.584 129.536 0 19.456 5.12 23.552 23.040 18.944 13.312-3.072 13.824-4.608 10.24-27.136-11.264-77.824-80.384-144.384-158.208-152.576l-28.672-3.072v15.36z',
    'M381.952 579.584c-1.536 6.656-3.072 17.92-3.072 25.088 0 21.504-18.944 26.624-42.496 10.752l-19.456-12.8-26.112 25.6-26.112 26.112 15.36 19.968c21.504 26.624 16.384 39.936-16.896 45.056l-24.064 3.584 3.584 26.112c1.536 14.848 3.072 31.744 3.072 37.888 0 10.24 2.56 11.776 22.016 11.776 18.432 0 23.552 2.048 28.16 12.288s3.072 15.36-7.168 30.208c-6.656 10.24-12.288 20.48-12.288 23.040s11.776 14.336 26.112 26.624c17.92 15.36 28.16 20.48 32.768 17.408 25.6-18.944 32.256-22.016 41.984-19.456 8.704 2.56 12.288 8.192 14.848 25.6l3.072 22.528h74.752l3.584-25.6c3.072-21.504 5.632-26.112 15.872-28.672 7.68-2.048 16.896 0.512 27.136 7.68 8.192 6.144 16.896 10.752 19.456 10.752s15.872-11.264 29.184-25.088l25.088-25.088-15.36-18.944c-9.728-11.776-14.848-22.528-13.312-28.672 2.56-9.728 6.656-11.264 36.352-17.408l16.896-3.584-3.072-33.792c-2.048-18.944-5.12-35.84-7.168-37.888-1.536-2.048-12.288-4.096-23.040-5.12-27.648-2.048-32.768-16.384-14.848-42.496l12.8-18.944-26.112-26.624c-19.456-19.456-28.16-24.576-33.28-20.992-28.16 20.48-34.304 23.552-43.52 20.48-7.168-2.048-11.776-9.728-14.336-24.576l-4.608-21.504-36.352-1.536c-33.792-1.536-36.352-0.512-39.424 10.24zM433.152 622.592c2.048 10.24 7.168 19.456 11.776 20.992 4.608 1.024 16.896 6.144 27.648 10.752 18.432 7.68 19.968 7.168 34.816-3.584 21.504-15.872 30.72-7.168 15.36 14.336-10.752 14.848-10.752 16.896-3.584 29.696 4.608 8.192 10.24 20.48 13.312 28.16 4.096 12.288 7.68 14.336 25.6 14.336 16.384 0 20.48 2.048 20.48 9.728 0 7.168-5.12 10.24-18.944 12.8-17.92 2.56-20.48 5.12-30.208 31.232l-11.264 28.672 12.288 14.336c8.704 10.24 10.24 15.872 6.144 19.968s-9.728 3.072-20.48-4.608l-14.848-10.752-27.136 11.776c-24.064 10.752-27.648 14.336-31.744 32.256-6.144 27.648-16.384 29.696-20.48 4.096-3.072-18.432-5.632-21.504-24.576-28.16-11.264-4.096-24.576-8.704-29.184-10.752-5.12-2.56-13.824 1.024-24.576 9.728-12.8 10.752-16.384 12.288-18.944 6.144-1.536-4.096 1.536-14.336 7.168-23.552 9.216-15.36 9.216-15.872-3.584-44.032-12.8-26.624-14.336-28.16-32.768-28.16-15.872 0-19.456-1.536-17.92-9.216 1.024-6.144 7.168-9.216 20.992-10.24s18.944-4.096 18.944-10.24c0-4.608 4.608-17.92 9.728-29.696l9.728-20.992-12.8-16.384c-10.24-12.8-11.264-16.384-5.12-18.944 4.608-1.536 13.824 1.024 20.992 5.632 12.8 8.704 14.848 8.192 41.472-3.072 21.504-9.728 28.16-14.848 28.16-23.552 0-30.72 17.92-37.376 23.552-8.704z',
    'M389.12 681.984c-30.208 15.36-47.616 47.616-44.544 80.384 6.144 55.808 67.072 88.576 119.296 64 25.6-12.288 39.424-34.816 41.984-68.096 1.536-23.552 0-31.744-10.24-46.080-27.136-39.936-66.048-51.2-106.496-30.208zM458.24 718.848c26.112 26.112 20.48 65.024-11.776 78.336-34.816 14.336-67.584-6.656-67.584-44.544 0-40.96 50.688-62.464 79.36-33.792z',
    'M813.056 620.032c-22.016 10.752-39.936 20.992-39.936 22.528 0 10.752 109.568 218.112 117.248 222.72 5.632 2.56 18.432 5.12 28.672 5.12 23.040 0 48.64-23.040 48.64-43.008 0-14.336-104.96-228.352-111.616-228.352-2.048 0.512-21.504 9.728-43.008 20.992z'
  ]
};

const SEARCH_FIELDS = [
  {
    name: 'Projects',
    icon: ICONS.PROJECT
  },
  {
    name: 'Issues',
    icon: ICONS.ISSUES
  },
  {
    name: 'Accounts',
    icon: ICONS.USER
  },
];

const SIDE_BAR_BEFORE_SELECT_PROJECT = [
  {
    name: 'Home',
    icon: ICONS.HOME,
    url: '/'
  },
  {
    name: 'Projects',
    icon: ICONS.PROJECT,
    url: '/projects'
  }
];

const SIDE_BAR_AFTER_SELECT_PROJECT = [
  {
    name: 'Backlog',
    icon: ICONS.BACKLOG,
    url: '/backlog'
  },
  {
    name: 'Active Sprints',
    icon: ICONS.SPRINT,
    url: '/activeSprint'
  },
  {
    name: 'Summary',
    icon: ICONS.SUMMARY,
    url: '/summary'
  }
];

const MODAL_TYPE = {
  CREATING_PROJECT: 'Creating project',
  CREATING_USER: 'Creating user',
  CREATING_ISSUE: 'Creating issue'
};

export {
  INPUT_EMAIL,
  INPUT_PASSWORD,
  INPUT_CONFIRM_PASSWORD,
  INPUT_NAME,
  ICONS,
  SEARCH_FIELDS,
  SIDE_BAR_BEFORE_SELECT_PROJECT,
  SIDE_BAR_AFTER_SELECT_PROJECT,
  MODAL_TYPE,
  INPUT_DESCRIPTION,
  INPUT_STATUS,
  WEB_SOCKET_URL
}
