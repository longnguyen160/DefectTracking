const WEB_SOCKET_URL = 'http://localhost:8080/ws';

const FILE_BASE_URL = 'http://localhost:8080/files/?fileId=';

const INPUT_TEXT = 'text';
const INPUT_PASSWORD = 'password';
const TEXT_AREA = 'textarea';
const SELECT = 'select';
const CREATABLE = 'creatable';
const DATETIME_PICKER = 'datetime_picker';
const FILE = 'file';

const ICONS = {
  ARROW: ['M389.632 102.912l-358.4 358.4c-27.955 27.955-27.955 73.318 0 101.376l358.4 358.4c27.955 27.955 73.318 27.955 101.376 0 27.955-27.955 27.955-73.318 0-101.376l-236.032-236.032h687.104c39.629 0 71.68-32.051 71.68-71.68s-32.051-71.68-71.68-71.68h-687.104l236.032-236.032c14.029-14.029 20.992-32.358 20.992-50.688s-6.963-36.659-20.992-50.688c-28.058-27.955-73.421-27.955-101.376 0z'],
  ATTACHMENT: ['M847.77 273.92l-121.549-119.808c-9.216-9.114-21.504-14.131-34.509-14.131v0h-173.466v-42.906c0-47.821-38.912-86.835-86.835-86.835-23.245 0-45.056 9.011-61.44 25.498-16.384 16.384-25.498 38.195-25.395 61.44v42.906h-133.837c-27.034 0-49.050 22.016-49.050 49.050v775.578c0 27.034 22.016 49.050 49.050 49.050h602.624c27.136 0 49.152-22.016 49.152-49.050v-655.77c-0.102-13.107-5.427-25.805-14.746-35.021zM805.581 288.768h-93.491l-0.102-92.262 93.594 92.262zM384.819 97.075c0-12.493 4.813-24.166 13.722-32.973 8.806-8.806 20.48-13.722 32.973-13.722 25.702 0 46.694 20.992 46.694 46.592v42.906h-93.286v-42.803zM813.261 973.517h-602.522c-4.915 0-8.909-3.994-8.909-8.909v-775.475c0-4.915 3.994-8.909 8.909-8.909h267.366v278.118c0 37.99-30.925 68.915-68.915 68.915 0 0 0 0 0 0-18.33 0-35.635-7.168-48.742-20.173-13.005-13.005-20.173-30.31-20.173-48.742v-187.187c0-11.059-9.011-20.070-20.070-20.070s-20.070 9.011-20.070 20.070v187.187c0 29.082 11.366 56.525 31.949 77.107s48.026 31.949 77.107 31.949c0 0 0 0 0 0 60.109 0 109.056-48.947 109.056-109.056v-278.118h153.498l0.102 128.717c0 11.059 9.011 20.070 20.070 20.070h130.253v635.597c-0 4.915-3.994 8.909-8.909 8.909z'],
  DELETE: ['M639.834 512v0l380.837 383.501-127.834 127.168-382.835-381.503-382.835 381.503-127.834-127.168 380.837-383.501-380.837-383.501 127.834-127.168 382.835 381.503 382.835-381.503 127.834 127.168-380.837 383.501z'],
  PROJECT: ['M554.667 85.333l-469.333 85.333v682.667l469.333 85.333h42.667v-853.333h-42.667zM640 213.333v128h170.667v128h64l-85.333 85.333-85.333-85.333h64v-85.333h-128v149.333l106.667 106.667-106.667 106.667v64h298.667v-597.333h-298.667zM321.333 337.333c104.875-9.301 117.333 68.245 117.333 109.333s-28.629 123.264-122.667 117.333l-34.667-1.333 1.333 117.333-69.333-8v-321.333l108-13.333zM308 398.667l-28 1.333 1.333 105.333h28c40.405-0.128 61.632-18.325 61.333-56-0.256-36.864-22.261-53.739-62.667-50.667z'],
  SEARCH: ['M947.863 924.25l-162.093-178.778c64.971-78.45 104.388-180.12 104.388-290.996 0-0.233-0-0.467-0.001-0.7l0 0.037c-4.734-242.255-202.235-436.826-445.179-436.826-245.91 0-445.259 199.349-445.259 445.259s199.349 445.259 445.259 445.259c0.014 0 0.028-0 0.043-0l-0.002 0c0.217 0 0.474 0.001 0.731 0.001 95.501 0 183.813-30.783 255.554-82.967l-1.249 0.866 164.081 180.706c10.479 11.17 25.333 18.128 41.812 18.128 15.711 0 29.944-6.325 40.293-16.567l-0.005 0.005c10.881-10.897 17.61-25.943 17.61-42.56 0-15.791-6.077-30.164-16.019-40.906l0.036 0.040zM445.018 118.423c1.882-0.038 4.101-0.060 6.325-0.060 185.231 0 335.39 150.159 335.39 335.39s-150.159 335.39-335.39 335.39c-185.21 0-335.356-150.125-335.39-335.327l-0-0.003c-0.007-0.811-0.011-1.77-0.011-2.73 0-182.467 146.899-330.624 328.884-332.658l0.192-0.002z'],
  ANGLE_DOWN: ['M1722.18 162.84l-162.898-162.891-698.195 698.094-698.195-698.094-162.891 162.891 861.133 861.109z'],
  USER: ['M0 512c0 282.77 229.23 512 512 512s512-229.23 512-512c0-282.77-229.23-512-512-512v0c-282.621 0.371-511.629 229.379-512 511.964l-0 0.036zM512 51.2c0.074-0 0.161-0 0.248-0 254.21 0 460.288 206.078 460.288 460.288 0 121.808-47.315 232.565-124.569 314.895l0.23-0.248c-46.728-32.574-100.731-65.138-156.838-94.202l-8.212-3.869v-57.53c6.585-14.113 12.353-30.707 16.442-47.952l0.361-1.805c26.94-17.54 45.353-46.232 48.696-79.374l0.037-0.452c5.881-12.58 9.313-27.314 9.313-42.85 0-18.168-4.693-35.24-12.933-50.070l0.269 0.527c15.313-84.201 8.378-146.385-20.806-184.832-11.069-15.128-26.453-26.51-44.331-32.402l-0.631-0.18c-14.572-19.785-32.951-35.888-54.156-47.465l-0.861-0.43c-28.975-17.146-63.859-27.277-101.109-27.277-7.143 0-14.199 0.373-21.149 1.099l0.868-0.074c-17.987 0.884-34.895 4.223-50.812 9.694l1.288-0.385c-20.102 7.027-37.527 16.112-53.356 27.304l0.666-0.447c-19.841 12.809-37.054 27.093-52.397 43.175l-0.106 0.112c-27.9 27.433-48.399 62.31-58.28 101.413l-0.321 1.499c-4.232 15.179-6.664 32.609-6.664 50.607 0 14.504 1.58 28.64 4.576 42.244l-0.24-1.296c-2.925 2.177-5.476 4.595-7.715 7.283l-0.058 0.071c-8.306 14.278-13.208 31.424-13.208 49.714 0 15.411 3.48 30.009 9.698 43.051l-0.26-0.605c5.41 29.117 18.989 54.426 38.243 74.177l-0.029-0.030c5.612 28.93 15.004 54.686 27.801 78.33l-0.711-1.437v46.545c-64.389 33.042-118.388 65.603-170.030 101.33l4.979-3.258c-77.012-82.053-124.32-192.779-124.32-314.554 0-254.106 205.993-460.1 460.098-460.102l0.001-0z'],
  HOME: ['M1024 608l-192-192v-288h-128v160l-192-192-512 512v32h128v320h320v-192h128v192h320v-320h128z'],
  CATEGORY: [
    'M12.8 12.8l-12.8 12.288v415.744l12.8 12.288 12.288 12.8h415.744l12.288-12.8 12.8-12.288v-415.744l-12.8-12.288-12.288-12.8h-415.744l-12.288 12.8zM368.64 232.96v135.68h-271.36v-271.36h271.36v135.68z',
    'M570.88 12.8l-12.8 12.288v415.744l12.8 12.288 12.288 12.8h415.744l12.288-12.8 12.8-12.288v-206.848c0-201.728-0.512-207.36-10.752-220.672l-10.24-13.312h-419.84l-12.288 12.8zM926.72 232.96v135.68h-271.36v-271.36h271.36v135.68z',
    'M12.8 570.88l-12.8 12.288v419.84l13.312 10.24c13.312 10.24 18.944 10.752 220.672 10.752h206.848l12.288-12.8 12.8-12.288v-415.744l-12.8-12.288-12.288-12.8h-415.744l-12.288 12.8zM368.64 791.040v135.68h-271.36v-271.36h271.36v135.68z',
    'M570.88 570.88l-12.8 12.288v415.744l12.8 12.288 12.288 12.8h415.744l12.288-12.8 12.8-12.288v-415.744l-12.8-12.288-12.288-12.8h-415.744l-12.288 12.8zM926.72 791.040v135.68h-271.36v-271.36h271.36v135.68z'
  ],
  EYE: [
    'M652.965 512.007c0-77.834-63.081-140.972-140.958-140.972s-140.972 63.117-140.972 140.972c0 77.841 63.088 140.965 140.972 140.965 77.856 0 140.958-63.117 140.958-140.965zM932.453 511.581c-96.2 127.151-248.725 209.32-420.439 209.32-171.736 0-324.246-82.169-420.446-209.32 96.192-127.144 248.71-209.313 420.439-209.313s324.239 82.169 420.446 209.313zM1018.878 511.819c-105.83-168.21-293.252-280.037-506.87-280.037s-401.054 111.827-506.885 280.037c105.83 168.427 293.266 280.398 506.885 280.398s401.040-111.972 506.87-280.398z'
  ],
  EYE_CROSS: [
    'M464.906 198.84c-170.414 17.654-325.919 116.675-439.265 279.439-20.982 30.198-20.777 35.492 2.161 67.85 41.574 58.44 84.132 104.52 135.895 146.872 8.233 6.861 14.899 12.943 14.899 13.527 0 0.594-22.159 15.688-49.029 33.331-27.064 17.654-50.401 33.925-51.968 36.086-5.683 8.038-3.533 16.865 7.455 32.748 11.182 16.087 18.627 20.204 27.843 16.087 2.55-1.178 128.051-83.149 278.856-181.975 150.804-99.031 335.923-220.416 411.423-269.834 75.5-49.613 139.233-92.17 141.783-94.915 7.26-8.233 5.683-17.060-6.083-33.925-10.394-15.104-16.865-19.415-25.498-17.060-2.355 0.584-26.276 15.493-53.146 33.137l-48.824 32.164-25.692-15.677c-65.884-39.813-132.362-64.123-206.1-75.11-23.521-3.523-91.372-5.1-114.708-2.744zM558.049 328.264c22.354 5.888 52.163 20.982 70.595 35.881 13.926 11.377 30.003 28.047 28.242 29.614-2.161 1.567-309.832 203.151-310.426 203.151-1.761 0-13.527-28.826-17.254-42.353-5.489-20.398-6.083-65.3-0.983-85.893 18.627-74.516 76.288-129.229 150.999-143.544 19.999-3.717 58.634-2.345 78.828 3.144z',
    'M806.113 445.921c-57.457 37.847-104.909 68.833-105.103 69.222-0.195 0.195-1.567 8.428-2.744 18.043-10.199 77.455-64.717 139.622-140.206 160.215-22.753 6.083-67.656 6.083-90.593 0-9.021-2.355-18.237-5.294-20.787-6.472-4.116-1.761-11.96 2.744-74.127 43.336-38.236 25.098-70.011 46.080-70.984 46.868-2.939 2.939 51.374 22.548 87.849 31.764 141.384 35.891 290.417 8.233 420.628-78.244 68.239-45.302 136.489-113.152 188.252-187.668 20.787-29.809 20.787-35.492-0.983-66.284-25.887-36.669-79.227-99.42-84.326-99.42-1.372 0.010-49.418 30.996-106.875 68.639z'
  ],
  FILE: [
    'M789.333 1002.667h-554.667c-47.125 0-85.333-38.208-85.333-85.333v-810.667c0-47.125 38.208-85.333 85.333-85.333h404.757c0.043 0 0.107 0 0.149 0h0.427c6.827 0 12.651 3.435 16.555 8.427l209.685 209.685c5.013 3.904 8.427 9.728 8.427 16.555v0 0.448c0 0.043 0 0.064 0 0.107v660.779c0 47.125-38.208 85.333-85.333 85.333zM661.333 93.461v141.205h141.205l-141.205-141.205zM832 277.333h-192c-11.797 0-21.333-9.557-21.333-21.333v-192h-384c-23.552 0-42.667 19.115-42.667 42.667v810.667c0 23.552 19.115 42.667 42.667 42.667h554.667c23.552 0 42.667-19.115 42.667-42.667v-640zM704 832h-384c-11.797 0-21.333-9.536-21.333-21.333 0-11.776 9.536-21.333 21.333-21.333h384c11.797 0 21.333 9.557 21.333 21.333 0 11.797-9.536 21.333-21.333 21.333zM704 661.333h-384c-11.797 0-21.333-9.536-21.333-21.333 0-11.776 9.536-21.333 21.333-21.333h384c11.797 0 21.333 9.557 21.333 21.333 0 11.797-9.536 21.333-21.333 21.333zM704 490.667h-384c-11.797 0-21.333-9.536-21.333-21.333 0-11.776 9.536-21.333 21.333-21.333h384c11.797 0 21.333 9.557 21.333 21.333 0 11.797-9.536 21.333-21.333 21.333z'
  ],
  MENU: [
    'M64 192h896v192h-896zM64 448h896v192h-896zM64 704h896v192h-896z'
  ],
  COLUMN: [
    'M2.8 2.8c-1.6 1.2-2.8 231.6-2.8 512v509.2h248v-1024h-121.2c-66.8 0-122.8 1.2-124 2.8z',
    'M388 512v512h248v-1024h-248v512z',
    'M776 512v512h248v-1024h-248v512z'
  ],
  IMAGE: [
    'M668.8 144.64l-171.2 32-139.52-20.16c-125.12-17.92-140.16-19.52-148.48-15.36-15.36 7.68-20.48 17.92-25.92 55.68-2.56 19.2-6.080 36.16-7.040 37.12-1.28 1.28-36.16 8-77.44 15.36-41.28 7.68-78.4 15.68-82.56 18.24-3.84 2.56-9.6 9.6-12.48 15.36-4.48 9.92-4.48 13.12 1.6 45.44 3.84 19.2 28.48 152.96 55.040 297.28s50.56 265.6 53.12 269.44c6.080 9.6 15.68 14.4 28.16 14.4 5.44-0.32 53.12-8.32 105.92-17.92 52.8-9.92 158.72-29.44 235.2-43.52l139.2-25.6 144.64 21.12c181.44 26.24 169.6 28.8 180.48-41.28 3.2-21.12 6.080-38.4 6.72-38.72s6.4-2.88 12.8-5.76c7.040-3.2 14.080-9.92 17.28-16 5.12-9.92 5.12-12.48-3.52-58.88l-8.96-48.64 25.6-176.96c28.16-193.6 27.84-190.72 9.28-202.88-4.8-3.2-27.52-8.32-57.92-12.48-27.2-3.84-49.92-7.68-50.56-8.64-0.64-0.64-4.8-22.72-9.6-48.96s-10.24-50.24-12.16-53.76c-4.16-8-21.76-18.56-30.080-18.24-3.52 0.32-83.52 14.72-177.6 32.32zM820.8 205.12c1.28 8.64 1.6 16.64 1.28 17.28-1.92 1.6-98.88-12.48-98.88-14.72 0-1.28 76.16-16.64 91.84-18.56 1.92 0 4.48 6.72 5.76 16zM542.72 254.4c152.96 22.080 304.96 44.16 337.92 48.64 32.96 4.8 61.44 9.28 63.040 10.24 1.92 1.28-6.4 66.56-20.48 165.12-13.12 89.92-28.48 195.84-34.24 236.16-8.32 58.56-11.52 72.64-15.36 72.64-12.16-0.32-685.12-98.24-687.040-100.16-0.96-1.28 0.32-18.24 3.2-38.080 37.76-264 60.16-418.56 61.76-425.92 1.28-5.44 3.84-8.64 7.36-8.64 3.2 0 130.88 17.92 283.84 40zM147.2 449.28c-10.56 73.6-19.2 134.4-19.2 135.68 0 0.96-0.64 0.96-1.6 0-1.6-1.6-45.12-233.28-47.040-250.56l-0.96-9.28 43.2-8.32c29.12-5.44 43.52-7.040 44.16-4.8 0.32 1.92-7.68 63.68-18.56 137.28zM276.8 772.8c108.8 15.36 123.52 17.92 118.4 19.52-6.080 2.24-214.080 39.68-219.2 39.68-4.16 0-6.4-7.040-10.88-31.36-3.2-16.96-6.4-34.56-7.36-38.72-1.6-6.72-0.96-7.36 7.36-5.44 5.12 0.96 55.36 8.32 111.68 16.32z',
    'M380.8 331.52c-24.64 10.56-38.4 32.32-38.4 60.48 0 23.040 5.44 35.52 21.76 50.24 40.32 36.48 102.4 13.12 111.36-41.28 4.16-26.24-11.52-55.040-37.44-68.48-14.72-7.36-41.28-8-57.28-0.96z',
    'M572.8 502.4c-41.28 47.68-76.16 86.4-77.44 86.4s-14.72-3.52-29.44-8c-100.48-29.12-185.28-9.92-217.6 49.28-4.8 8.96-8 17.6-7.040 19.2 0.96 1.28 9.28 3.52 18.56 4.48s142.72 19.84 296.64 42.24c153.6 22.080 280 39.68 280.64 39.040 0.64-0.32-8.32-51.2-19.52-112.32-11.52-61.44-20.8-112.32-20.8-113.6 0-0.96-14.72 12.8-32.64 30.72l-32.96 32.64-39.68-78.080c-21.76-43.2-40.64-78.4-41.6-78.4-0.96 0.32-35.84 39.040-77.12 86.4z'
  ],
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
  ],
  PRIVATE: [
    'M796.444 417.185v-132.742c0-155.495-128.948-284.443-284.443-284.443-155.497 0-284.445 128.948-284.445 284.445v132.742c-64.475 0-113.778 49.303-113.778 113.778v189.63c0 166.874 136.533 303.407 303.407 303.407h189.63c166.874 0 303.407-136.533 303.407-303.407v-189.632c0-60.681-49.303-113.778-113.778-113.778zM265.481 284.445c0-136.533 109.984-246.518 246.518-246.518s246.518 109.984 246.518 246.518v132.742h-37.926v-132.742c0-113.778-94.814-208.594-208.594-208.594s-208.59 94.814-208.59 208.594v132.742h-37.926v-132.742zM682.667 284.445v132.742h-341.333v-132.742c0-94.814 75.852-170.666 170.666-170.666s170.668 75.85 170.668 170.666zM872.296 720.593c0 147.912-117.569 265.481-265.481 265.481h-189.63c-147.91 0-265.481-117.569-265.481-265.481v-189.63c0-41.72 34.132-75.852 75.852-75.852h568.889c41.718 0 75.852 34.132 75.852 75.852v189.63z',
    'M512.001 568.889c-53.096 0-94.814 41.718-94.814 94.814 0 30.341 15.17 56.89 37.926 75.852v75.852c0 30.341 26.549 56.89 56.89 56.89s56.89-26.549 56.89-56.89v-75.852c22.756-18.962 37.926-45.511 37.926-75.852-0.004-53.096-41.721-94.814-94.818-94.814zM530.963 716.801v98.607c0 11.377-7.585 18.962-18.962 18.962s-18.962-7.585-18.962-18.962v-98.607c-22.756-7.585-37.926-30.343-37.926-53.096 0-30.341 26.549-56.89 56.89-56.89s56.89 26.549 56.89 56.89c-0.004 26.547-15.174 45.511-37.93 53.096z'
  ],
  PUBLIC: [
    'M513.126 837.53h-357.171c0-70.554 14.131-119.91 70.554-141.005 56.422-21.197 133.939-49.357 176.23-84.582 49.357-42.291 35.226-42.291 23.552-56.422-16.486-18.842-18.842-68.198-18.842-68.198-49.357-14.131-37.581-96.358-28.16-96.358 11.776 0 11.776-4.71 4.71-47.002-9.421-54.067-4.71-84.582 21.197-119.808s105.779-37.581 105.779-37.581v0c0 0 79.872 4.71 105.779 37.581 25.805 35.226 30.515 63.488 21.197 119.808-7.066 44.646-7.066 47.002 4.71 47.002s23.552 82.227-28.16 96.358c0 0-2.355 49.357-18.842 68.198-11.776 14.131-25.805 14.131 23.552 56.422 42.291 37.581 119.91 65.843 176.23 84.582 56.422 21.197 70.554 70.554 70.554 141.005l-352.87-0z',
    'M896.205 799.846h117.555c0-51.712-9.421-89.293-51.712-103.424s-98.714-35.226-131.584-63.488c-37.581-30.515-25.805-30.515-18.842-42.291 11.776-14.131 14.131-49.357 14.131-49.357 37.581-9.421 28.16-70.554 21.197-70.554s-9.421-2.355-2.355-35.226c7.066-39.936 4.71-63.488-16.486-86.938-18.842-25.805-77.517-28.058-77.517-28.058v0c0 0-58.778 2.355-77.517 28.16-4.71 4.71-7.066 11.776-11.776 16.486 0 0 23.45 14.131 25.805 35.226 2.355 23.552 2.355 44.646-9.421 75.162-14.131 30.515-16.486 49.357 9.421 72.806 14.131 11.776 4.71 65.843 4.71 65.843s68.198 35.226 141.005 61.133c72.806 25.907 63.386 124.518 63.386 124.518z',
    'M127.795 799.846h-117.555c0-51.712 9.421-89.293 51.712-103.424s98.714-35.226 131.584-63.488c37.581-30.515 25.805-30.515 18.842-42.291-11.776-14.131-14.131-49.357-14.131-49.357-37.581-9.421-28.16-70.554-21.197-70.554s9.421-2.355 2.355-35.226c-7.066-39.936-4.71-63.488 16.486-86.938 18.842-25.805 77.517-28.058 77.517-28.058v0c0 0 58.778 2.355 77.517 28.16 4.71 4.71 7.066 11.776 11.776 16.486 0 0-23.552 14.131-25.805 35.226-2.355 23.552-2.355 44.646 9.421 75.162s16.486 49.357-9.421 72.806c-14.131 11.776-4.71 65.843-4.71 65.843s-68.198 35.226-141.005 61.133c-72.806 25.907-63.386 124.518-63.386 124.518z'
  ],
  LOGOUT: [
    'M38.871 19.507l-9.267 9.267v966.441l18.534 18.545h573.215l8.724-7.905 9.001-7.905 0.819-167.434c0.543-122.163-0.266-169.073-2.458-174.797-7.363-17.449-29.727-21.268-43.633-7.639l-7.905 7.905v303.237h-501.76v-894.444h501.76v303.237l7.905 7.905c13.906 13.64 36.27 9.82 43.633-7.639 2.181-5.724 3-52.634 2.458-174.797l-0.819-167.434-9.001-7.905-8.724-7.905h-573.215l-9.267 9.267z',
    'M839.782 374.016c-12.268 6.82-17.183 22.907-10.906 35.174 1.638 3.277 18.545 21.545 37.356 40.632l34.632 34.908h-580.024l-9.267 9.267c-6.543 6.543-9.267 11.725-9.267 18.002s2.724 11.182 9.267 18.002l9.267 9.277h579.748l-35.717 36.26c-21.268 21.268-36.536 38.994-37.632 43.633-5.181 20.726 12.544 38.451 33.536 33.27 10.086-2.458 130.345-122.716 132.803-133.079 1.096-4.086 1.096-10.639 0-15.002-1.905-8.182-114.801-123.802-127.355-130.345-8.991-4.639-17.992-4.639-26.44 0z'
  ],
  MANAGEMENT: [
    'M696.32 4.096c-52.338 17.294-81.465 55.524-81.92 107.861-0.455 93.753 103.765 143.815 179.769 86.016 47.332-36.409 51.883-120.149 8.647-163.385-26.852-26.396-76.004-40.505-106.496-30.492z',
    'M337.692 80.1c-18.66 12.743-13.653 30.948 18.204 63.716l27.762 29.127h-14.108c-43.691 0-120.149 25.941-166.571 56.889-89.202 59.164-144.27 145.636-163.84 256.683l-2.731 15.474 9.557-12.288c10.468-13.653 31.403-25.486 43.691-25.486 6.372 0 11.378-8.192 19.57-32.313 35.044-103.31 141.54-190.692 247.125-202.98l23.666-2.731-25.941 27.762c-20.48 20.935-26.396 30.948-26.396 41.415 0 15.929 16.839 30.037 30.948 25.941 13.198-4.551 119.239-114.233 119.239-123.335 0-10.468-113.323-125.156-123.335-125.156-3.641 0-11.378 3.186-16.839 7.282z',
    'M698.14 270.791c-1.365 3.641 1.365 13.198 6.372 21.39 7.737 13.198 8.647 18.66 5.006 42.325-3.186 21.39-2.276 31.858 3.641 48.697 4.096 12.288 9.102 21.845 10.468 21.845s6.372-9.557 10.468-21.845c5.916-16.839 6.827-26.852 3.641-48.697-3.641-23.666-2.731-29.582 4.551-42.78 5.006-8.647 8.192-18.204 6.827-21.39-3.641-9.102-47.787-8.647-50.972 0.455z',
    'M593.92 274.887c-35.499 6.827-54.613 18.66-70.542 43.236-17.294 25.486-19.115 40.96-17.294 140.174 1.365 80.1 1.82 82.83 12.288 94.208l10.923 11.833h388.665l10.923-11.833c10.468-11.378 10.923-14.108 12.288-89.657 0.91-43.236 0.455-88.747-1.365-101.945-3.641-29.127-23.211-59.62-46.421-72.818-19.57-10.468-82.375-22.756-87.836-16.839-1.82 2.276-18.204 45.056-36.409 95.118-34.588 95.573-41.415 108.316-50.972 98.759-3.186-3.186-21.39-48.242-40.505-100.124-38.684-106.496-33.223-100.58-83.74-90.112z',
    'M172.032 464.668c-5.916 3.186-8.192 10.468-8.192 25.031 0 37.774-15.019 47.787-43.236 29.127-23.666-15.929-31.858-12.288-51.428 21.39-42.325 72.818-42.325 71.452-11.833 92.388 23.666 15.929 23.666 29.582 0 45.511-29.582 20.025-29.582 22.3 0.91 74.183 30.037 51.428 36.409 55.524 61.895 40.050 28.217-17.749 43.691-8.192 43.691 26.396 0 11.833 2.276 23.666 5.461 26.852 7.737 7.737 108.772 7.737 116.508 0 3.186-3.186 5.461-15.019 5.461-26.396 0-15.019 2.731-23.666 8.192-28.672 10.923-10.012 17.294-9.557 35.499 1.82 25.941 15.929 32.768 11.378 62.35-40.050 29.582-51.883 29.582-54.158 0.455-74.183-23.666-15.929-23.666-29.582 0-45.511 29.127-20.025 29.127-22.3-0.91-74.183-30.037-50.972-35.954-55.068-60.53-40.050-29.582 18.204-45.056 8.647-45.056-26.852 0-17.749-1.82-23.666-8.647-27.307-11.378-5.916-100.124-5.916-110.592 0.455zM271.701 616.22c12.743 14.108 15.019 19.57 15.019 39.595 0 20.935-1.82 25.031-17.749 40.96s-20.025 17.749-40.96 17.749c-20.025 0-25.486-2.276-39.595-15.019-12.743-11.833-16.839-19.115-18.66-35.499-4.551-40.96 23.211-70.087 64.171-66.446 19.115 1.82 25.031 4.551 37.774 18.66z',
    'M978.489 592.1c-6.372 7.282-19.57 16.384-29.127 19.57-16.839 5.916-18.66 8.192-25.486 33.678-26.396 96.939-103.31 177.948-198.428 209.806-30.492 10.012-79.189 19.115-79.189 14.564 0-1.82 12.288-15.019 27.307-30.037 28.672-28.672 33.223-40.96 19.115-53.703-19.115-17.294-31.403-10.923-88.292 45.966-44.601 44.601-53.703 55.979-53.703 67.356s9.102 22.756 55.979 69.177c59.164 58.254 68.267 63.26 85.106 46.421 14.564-14.564 10.923-25.941-18.204-56.434-15.019-15.929-27.307-30.037-27.307-31.403 0-1.82 7.737-3.186 17.294-3.186 48.697 0 129.707-32.313 184.775-73.728 72.363-54.158 126.521-148.821 138.354-241.664 2.276-16.839 3.641-30.492 3.641-30.492-0.455 0-5.461 6.372-11.833 14.108z'
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
  },
  {
    name: 'Issues',
    icon: ICONS.ISSUES,
    url: '/issues'
  },
  {
    name: 'Management',
    icon: ICONS.MANAGEMENT
  }
];

const SIDE_BAR_AFTER_SELECT_PROJECT = [
  {
    name: 'Dashboard',
    icon: ICONS.BACKLOG,
    url: '/backlog'
  },
  {
    name: 'Summary',
    icon: ICONS.SUMMARY,
    url: '/summary'
  },
  {
    name: 'Members',
    icon: ICONS.USER,
    url: '/members'
  }
];

const MANAGEMENT_SIDE_BAR = [
  {
    name: 'Management',
    icon: ICONS.ARROW
  },
  {
    name: 'Projects',
    icon: ICONS.PROJECT,
    url: '/manage/projects'
  },
  {
    name: 'Accounts',
    icon: ICONS.USER,
    url: '/manage/users'
  },
  {
    name: 'Issues',
    icon: ICONS.ISSUES,
    url: '/manage/issues'
  },
  {
    name: 'Categories',
    icon: ICONS.CATEGORY,
    url: '/manage/categories'
  }
];

const MODAL_TYPE = {
  CREATING_PROJECT: 'Creating project',
  CREATING_USER: 'Creating user',
  CREATING_ISSUE: 'Creating issue',
  CREATING_PHASE: 'Creating phase',
  ISSUE_DETAILS: 'Issue Details',
  PROFILE: 'Profile',
  ADD_USER: 'Add user',
  ADD_CATEGORY: 'Add category'
};

const PROJECT_STATUS = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};

const ISSUE_STATUS_ARRAY = [
  {
    value: 'To Do',
    background: '#d1d1d1',
    color: '#1a1a1a'
  },
  {
    value: 'In Progress',
    background: '#026a95',
    color: '#fff'
  },
  {
    value: 'Testing',
    background: '#fe8f00',
    color: '#fff'
  },
  {
    value: 'Done',
    background: '#00c056',
    color: '#fff'
  },
];

const ISSUE_PRIORITY_ARRAY = [
  {
    value: 'urgent',
    label: 'Urgent',
    color: '#f83f06'
  },
  {
    value: 'high',
    label: 'High',
    color: '#e68507'
  },
  {
    value: 'medium',
    label: 'Medium',
    color: '#029243'
  },
  {
    value: 'low',
    label: 'Low',
    color: '#0083b9'
  },
];

const USER_ROLE_IN_PROJECT = [
  { value: 'developer', label: 'Developer' },
  { value: 'reporter', label: 'Reporter' },
  { value: 'manager', label: 'Manager' }
];

export {
  INPUT_TEXT,
  INPUT_PASSWORD,
  TEXT_AREA,
  DATETIME_PICKER,
  SELECT,
  CREATABLE,
  FILE,
  ICONS,
  SEARCH_FIELDS,
  SIDE_BAR_BEFORE_SELECT_PROJECT,
  SIDE_BAR_AFTER_SELECT_PROJECT,
  MANAGEMENT_SIDE_BAR,
  MODAL_TYPE,
  WEB_SOCKET_URL,
  PROJECT_STATUS,
  ISSUE_STATUS_ARRAY,
  ISSUE_PRIORITY_ARRAY,
  USER_ROLE_IN_PROJECT,
  FILE_BASE_URL,
}
