/*
 * jQuery.cupidify - cupidify your site
 *
 * Copyright 2015, uxMine
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: 28/1/2015
 * @author Tarafder Ashek E Elahi
 * @version 1.0
 * Depends:
 *   jquery.js
 *
 */

;
(function ($) {
    var defaults = {
        startDate: { "year": 2015, "month": 2, "day": 14 },
        endDate: { "year": 2015, "month": 2, "day": 14 },

        showCupid: true,
        cupidSize: 170,
        cupidLocation: "left",
        cupidColor: "#C62026",
        cupidHeartsColor: "#C62026",
        cupidMoveOnHover: true,

        showBalloons: true,
        balloonsLocation: "right",

        showWelcome: true,
        welcomeText: "Happy Valentines Day",
        moveBalloonsOnHover: true
    };

    var cupidHtml = '<svg version="1.0" id="cupid-main" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="170px" height="170px" viewBox="0 0 340 340" enable-background="new 0 0 340 340" xml:space="preserve"> <g id="hearts" fill="#ee4b7a"> <path id="heart1" d="M86.558,74.324c-2.459-0.242-5.38,2.2-5.467,4.618c-0.024,1.176-0.394,0.828-0.595-0.567c-0.195-1.48-1.674-3.18-3.13-3.631 c-1.673-0.534-3.874-0.009-5.132,1.242c-2.496,2.469-1.575,6.487,2.392,10.65c1.073,1.11,2.974,3.143,4.299,4.576l2.326,2.59 l0.594-1.021c0.307-0.526,1.838-2.323,3.411-3.963c3.403-3.572,5.463-6.956,5.58-9.048C91.015,76.965,89.168,74.611,86.558,74.324z"/> <path id="heart2" d="M86.558,74.324c-2.459-0.242-5.38,2.2-5.467,4.618c-0.024,1.176-0.394,0.828-0.595-0.567c-0.195-1.48-1.674-3.18-3.13-3.631 c-1.673-0.534-3.874-0.009-5.132,1.242c-2.496,2.469-1.575,6.487,2.392,10.65c1.073,1.11,2.974,3.143,4.299,4.576l2.326,2.59 l0.594-1.021c0.307-0.526,1.838-2.323,3.411-3.963c3.403-3.572,5.463-6.956,5.58-9.048C91.015,76.965,89.168,74.611,86.558,74.324z"/> <path id="heart3" d="M86.558,74.324c-2.459-0.242-5.38,2.2-5.467,4.618c-0.024,1.176-0.394,0.828-0.595-0.567c-0.195-1.48-1.674-3.18-3.13-3.631 c-1.673-0.534-3.874-0.009-5.132,1.242c-2.496,2.469-1.575,6.487,2.392,10.65c1.073,1.11,2.974,3.143,4.299,4.576l2.326,2.59 l0.594-1.021c0.307-0.526,1.838-2.323,3.411-3.963c3.403-3.572,5.463-6.956,5.58-9.048C91.015,76.965,89.168,74.611,86.558,74.324z"/> <path id="heart4" d="M86.558,74.324c-2.459-0.242-5.38,2.2-5.467,4.618c-0.024,1.176-0.394,0.828-0.595-0.567c-0.195-1.48-1.674-3.18-3.13-3.631 c-1.673-0.534-3.874-0.009-5.132,1.242c-2.496,2.469-1.575,6.487,2.392,10.65c1.073,1.11,2.974,3.143,4.299,4.576l2.326,2.59 l0.594-1.021c0.307-0.526,1.838-2.323,3.411-3.963c3.403-3.572,5.463-6.956,5.58-9.048C91.015,76.965,89.168,74.611,86.558,74.324z"/> </g> <g id="canvas" fill="#ee4b7a" stroke="none"> <g id="cupid"> <g id="rightwing"> <path d="M168.825,147.472c-1.323,2.068,34.634,23.864,4.903,13.284c6.317,6.87-17.576-8.104-15.847-7.802 c-0.427-0.075-0.765-0.401-1.249-0.554c-1.896-0.604-3.922,0.438-6.283,0.589c-2.658,0.171-5.913-0.349-4.189-2.659 c-1.633-0.075-4.275,0.467-6.394,0.392c-1.322-0.051-3.304-0.385-3.419-1.374c-0.141-1.197,1.729-1.466,2.234-2.338 c-2.629-0.812-7.913-0.422-7.801-3.719c0.052-1.522,1.414-2.359,2.822-2.874c-3.1-0.542-6.93-1.075-10.368-1.973 c-3.423-0.895-6.974-1.454-9.392-2.934c-1.36-0.833-3.343-3.23-2.99-5.36c0.151-0.908,1.721-2.464,2.719-2.871 c0.851-0.346,2.185-0.452,3.227-0.654c1.175-0.227,2.342-0.299,3.438-0.462c-1.985-1.354-4.863-1.656-7.648-2.604 c-1.138-0.388-2.54-1.452-3.77-2.372c-1.275-0.956-2.458-1.704-3.378-2.698c-2.052-2.221-4.252-6.739-2.489-10.063 c1.156-2.179,4.034-2.822,7.28-3.28c-1.653-1.691-4.323-3.36-6.17-5.929c-1.77-2.461-3.93-4.765-4.333-8.046 c-0.533-4.346,1.407-8.911,6.017-8.717c4.046,0.168,6.761,3.563,9.593,5.162c-5.23-6.431-10.713-15.944-10.37-29.04 c0.042-1.604,0.403-3.242,0.803-4.718c0.371-1.359,0.804-2.971,1.442-4.135c1.303-2.371,4.085-3.892,7.032-4.285 c2.679-0.359,5.501,0.787,5.93,2.885c0.096,0.466-0.061,1.074-0.032,1.527c0.263,4.426,1.248,8.663,1.898,12.735 c0.636,3.985,1.888,7.856,2.965,11.568c0.574,1.975,0.845,3.998,1.485,5.835c1.222,3.504,2.382,7.168,3.641,10.723 c0.593,1.679,1.539,3.223,2.352,4.778c1.652,3.159,3.219,6.234,5.196,9.126c1.942,2.845,3.53,5.922,5.776,8.49 c2.226,2.547,4.648,4.734,7.135,7.004c1.812,1.658,3.679,3.287,5.81,4.724c0.667,0.449,1.544,0.794,2.095,1.331 c1.068,1.036,2.37,3.063,2.659,4.764c0.274,1.614,0.046,3.262,0.216,4.772C162.021,141.435,165.715,144.498,168.825,147.472z M113.086,62.484c0.31,1.226,0.432,2.485,0.775,3.629c0.63,2.106,1.721,4.038,2.611,5.985c1.929,4.224,3.761,8.321,5.998,11.126 c-2.301-6.026-4.81-12.882-5.83-20.902c-0.448-3.513-0.195-8.696-3.363-9.107C110.882,54.7,112.474,60.054,113.086,62.484z M106.389,87.616c-1.554,2.119,1.953,3.016,3.618,3.5c2.969,0.861,5.898,2.877,8.113,3.907 C114.555,92.174,111.528,88.738,106.389,87.616z M109.915,109.333c-1.015,1.205-0.445,4.066,0.626,4.857 c0.105-4.997,6.671-2.837,9.079-1.733C117.003,110.862,113.992,108.627,109.915,109.333z"/> </g> <g> <path d="M251.513,167.39c0.628-0.053,1.238-0.072,1.772,0.019c0.633,1.063,1.313,2.048,1.869,3.232 c-0.54-0.09-1.235,0.068-1.776-0.021C252.719,169.602,252.132,168.468,251.513,167.39z"/> <path d="M273.27,241.487c-2.174,0.296-4.263,0.456-6.021,0.096c-0.023,0.822-0.982,1.671-1.929,1.159 c-0.363-0.566,0.32-1.144,0.463-1.666c-0.603-0.35-1.184-0.729-1.8-1.057c-0.297,0.36-1.542,0.896-2.061,0.566 c-0.534-0.728,0.597-1.084,0.659-1.711c-0.288-0.354-0.573-0.704-0.86-1.059c-1.016,0.183-1.97,0.641-2.195-0.03 c-0.23-0.687,0.899-0.73,1.268-1.325c-0.036-1.773-3.244-0.608-3.408-1.738c-0.131-0.888,1.168-0.691,1.805-1.235 c-0.096-0.432-0.192-0.862-0.288-1.291c-0.744-0.258-1.89,0.116-2.248-0.748c0.107-0.783,1.25-0.908,1.761-1.435 c-0.057-1.742-1.997-0.521-2.448-1.645c0.286-0.752,1.529-0.899,2.425-1.27c-0.014-1.5-1.241-1.09-2.141-1.189 c-1.168-1.836,1.991-1.089,2.103-2.24c-0.596-0.896-2.2-0.199-2.373-1.762c0.543-0.947,1.961-0.53,2.744-0.301 c-4.019-7.483-8.683-13.948-13.009-20.943c0.451-0.085,1.276,0.399,1.81,0.637c3.766,6.047,7.567,12.038,11.331,18.092 c0.849-2.931,1.496-5.72,2.604-8.393c1.087-2.624,2.896-4.867,3.717-7.603c-0.901-1.171-1.784-2.373-3.057-2.961 c-0.286-0.181-0.094-0.492-0.177-0.793c-5.592,1.028-10.158,0.575-14.796-0.03c-3.443-0.449-6.222-1.428-9.508-2.461 c-0.991-0.311-2.02-1.078-2.879-1.232c-0.841-0.146-1.879,0.1-2.788,0.103c-2.472,0.012-5.188-0.486-7.555-0.708 c-6.417-0.594-12.578-2.77-18.329-4.657c-1.452-0.477-2.847-1.147-4.248-1.76c-1.366-0.597-2.656-1.479-4.224-1.66 c-2.004,2.825-3.329,6.049-5.184,8.971c-1.846,2.904-3.829,5.637-5.934,8.408c-4.131,5.438-8.765,10.939-14.516,15.222 c-5.529,4.114-14.019,8.432-23.167,8.194c-6.574-0.171-13.24-1.727-18.604-4.492c-0.423-0.218-2.011-1.227-2.241-1.167 c-0.507,0.136-0.729,1.836-0.945,2.295c-0.535,1.144-1.399,2.308-2.037,3.477c-1.899,3.485-4.138,6.691-7.001,9.687 c-3.602,3.771-8.914,7.795-16.287,8.223c-3.853,0.224-7.967-0.286-11.436-1.303c-1.667-0.485-3.295-1.272-4.985-1.802 c-4.957-1.551-9.451-4.535-13.24-7.979c-2.61-2.373-4.44-5.494-7.175-7.876c-2.441,1.292-4.783,3.002-8.276,3.516 c-2.133,0.314-4.333,0.023-6.33-0.357c-0.642-0.122-1.545-0.487-1.864-0.418c-1.415,0.314-1.066,2.296-3.338,2.309 c-3.14,0.019-4.414-5.07-1.651-6.922c-0.463-2.648,0.09-4.286,0.996-6.264c1.185-2.589,3.026-5.253,5.527-6.965 c1.692-1.156,3.715-1.812,5.476-2.994c0.525-1.988,0.835-4.205,2.122-5.891c0.458-0.599,1.313-1.184,2.093-1.82 c0.709-0.579,1.479-1.461,2.236-1.646c0.937-0.229,2.452,0.323,3.584,0.658c2.927,0.867,5.24,2.763,6.864,5.55 c7.759,0.028,13.378,3.426,17.243,9.587c0.831-0.447,1.071-1.416,1.365-2.284c0.263-0.776,0.744-1.648,0.88-2.592 c0.37-2.59-1.1-7.701-2.987-8.708c-0.986-0.524-2.582-0.341-3.706-0.736c-1.503-0.526-2.993-1.349-4.512-2.012 c-4.429-1.935-8.29-5.196-11.685-8.949c-2.354-2.604-3.973-5.687-5.864-9.003c-1.867-3.27-3.069-7.39-3.873-11.738 c-0.658-3.565,0.326-6.716-0.177-10.586c-2.02-0.497-3.863-0.252-5.47-1.174c-2.488-1.426-3.9-4.292-6.391-5.759 c-0.614,2.36-5.374,4.982-7.109,2.21c-0.686-1.094-0.915-2.953-0.786-3.989c0.161-1.314,1.446-2.309,1.981-3.254 c0.335-4.832,3.404-8.717,9.935-9.614c2.445-0.337,5.381,0.532,7.308-1.319c1.069-1.027,1.663-2.445,2.653-3.51 c0.925-0.994,2.338-2.42,4.187-2.707c2.73-0.423,5.792,0.658,7.555,1.646c2.741,1.535,5.201,3.714,5.774,7.668 c0.47,3.233-0.729,5.549-1.192,8.182c-0.458,2.602-0.444,5.843,0.021,8.953c0.92,6.164,4.522,9.854,8.293,11.479 c2.884,1.245,9.024,2.367,13.374-0.277c4.596-2.793,5.561-7.688,10.331-10.64c1.513-0.937,3.404-2.018,5.068-2.485 c2.955-0.836,6.485-0.846,9.162-0.485c2.805,0.378,5.3,0.926,7.829,1.479c5.061,1.109,10.375,2.678,15.737,2.839 c11.005,0.33,22.943-5.301,25.896-12.764c0.835-2.11,1.769-4.004,0.377-7.167c-1.226-2.792-4.105-3.636-6.531-4.999 c-1.707-0.958-3.479-1.783-4.988-2.738c-3.052-1.938-6.296-4.086-9.179-6.596c-2.956-2.573-5.463-5.438-7.949-8.537 c-3.542-4.418-6.901-10.574-9.081-17.344c-1.532-4.764-1.77-10.109-2.242-14.707c-0.227-2.208,0.118-4.337,0.214-6.506 c0.192-4.372,0.956-8.256,2.347-11.877c0.711-1.854,1.1-3.742,2.011-5.448c0.863-1.616,1.868-3.107,3.005-4.734 c-4.114-0.043-7.156-1.782-9.399-4.775c0.504-0.176,1.15,0.149,1.743,0.34c1.683,0.543,3.94,1.198,6.141,0.919 c0.809-0.103,2.429-0.338,2.889-1.062c-3.195-0.375-6.346-0.822-8.614-2.659c-0.531-1.412-1.318-2.771-1.008-4.045 c0.941-3.86,8.625-3.602,10.54-1.312c-2.159,0.026-5.244,0.203-5.996,2.068c2.086,3.508,6.731,2.988,11.843,1.729 c-1.831-1.04-3.546-2.741-5.11-4.689c-1.47-1.835-3.471-3.938-3.602-6.8c0.693,0.055,1.035,0.995,1.491,1.542 c3.115,3.743,7.184,6.889,12.566,7.297c-2.294-1.601-5.554-3.955-6.779-7.964c-0.716-2.341-1.404-5.47-1.066-7.575 c1.021,0.093,1.301,1.352,1.6,2.038c2.583,5.916,6.472,10.785,12.713,11.223c-0.444-1.736-2.558-3.124-3.07-5.355 c-0.462-2.021,0.21-4.464,1.129-5.67c0.339,6.38,4.714,8.584,9.668,8.777c4.593,0.18,9.636-2.047,14.309-3.09 c6.108-1.365,12.45,1.9,16.695,3.874c2.386,1.111,4.866,2.323,7.205,3.808c2.158,1.372,5.056,3.291,7.334,3.464 c1.059,0.082,2.855-0.019,3.482-0.256c4.418-1.67,2.033-9.06-1.157-10.783c-1.764-0.952-4.247-0.297-6.141-0.919 c3.067-1.379,6.408-0.993,8.952-0.02c2.609,1,4.563,2.081,5.628,5.617c0.958,3.18,0.713,5.574-0.608,7.532 c1.019-1.392,2.651-2.963,3.326-4.701c1.904-4.914-2.948-10.331-5.033-13.667c1.087-0.183,1.824,0.881,2.526,1.519 c2.247,2.042,4.44,4.783,5.94,7.943c0.542-5.999-2.41-13.002-5.521-16.786c2.914,2.501,7.119,6.491,8.847,12.086 c2.153,6.979,1.546,15.109-2.374,18.758c-0.923,0.859-2.12,1.271-3.141,2.263c3.274,2.913,8.176,0.319,9.691-2.789 c1.157-2.377,1.415-5.483,0.486-8.546c2.592,2.901,3.274,8.755,1.688,12.227c-0.802,1.758-3.44,5.27-5.407,6.103 c-0.451,0.191-1.067,0.167-1.39,0.311c2.564,3.76,4.598,7.182,5.56,13.235c0.246,1.54,0.19,3.223,0.149,4.862 c-0.041,1.623,0.117,3.278,0.025,4.786c-0.194,3.264-1.132,6.052-0.452,9.163c1.027,4.699,3.783,6.644,6.636,8.726 c0.845,0.616,2.138,1.552,2.275,2.722c0.081,0.687-0.8,2.917-1.199,3.496c-0.865,1.258-2.522,1.97-3.691,2.596 c0.303,0.951,0.164,1.582,0.531,2.381c0.526,1.141,1.813,1.76,1.503,2.996c-0.301,1.198-2.741,1.205-2.952,2.639 c1.057,1.938,1.337,4.715,0.315,6.075c-3.152,1.439-5.267,1.831-6.469,4.153c-0.634,1.228-0.598,2.637-1.009,3.871 c-0.207,0.622-0.73,1.296-1.111,2.02c-0.348,0.662-0.637,1.465-1.134,1.92c-1.125,1.036-2.916,1.732-4.449,2.453 c-3.28,1.545-6.944,2.571-10.902,2.957c-2.359,0.229-5.352-0.364-7.815,0.911c-0.809,0.419-1.776,1.701-1.761,2.372 c0.023,0.892,0.813,1.889,1.272,2.426c2.143,2.505,5.607,3.738,8.229,6.079c2.674,2.381,4.739,4.947,6.13,9.253 c2.182,1.347,5.215,1.352,7.687,2.242c0.692-0.673,1.402-1.358,2.203-2.264c0.573-0.648,1.293-2.067,1.959-2.416 c0.817-0.429,2.367-0.413,3.419-0.556c2.415-0.33,4.34-0.523,6.37-0.383c1.059,1.779,2.144,3.513,2.863,5.821 c0.75-0.198,0.828,0.421,1.721,0.24c0.501,1.042,1.018,2.063,1.447,3.219c-0.825,0.004-1.666,0.031-2.415-0.085 c-0.668,1.704-0.916,3.675-1.372,5.514c1.108,0.524,1.742,2.064,2.946,2.466c1.609,0.537,4.697,0.296,6.551,0.412 c3.856,0.243,6.907,0.757,10.082,2.227c1.082,0.505,2.694,1.75,3.605,1.696c2.558-0.153,2.917-4.214,5.739-4.616 c1.74-0.248,3.663,1.832,5.328,1.937c2.904-2.414,3.891-6.046,5.173-9.49c-10.14-0.077-20.337-0.063-30.533-0.054 c-0.493-1.19-1.211-2.026-1.668-3.273c10.843-0.044,21.638-0.018,32.483-0.068c2.508-8.493-2.802-17.956-5.652-26.237 c-1.486-4.316-3.436-8.448-4.854-12.874c-1.606-5.012-2.851-11.165-3.414-16.214c-0.781,0.391-1.211,1.451-1.781,2.271 c-3.961,5.686-7.704,11.797-12.058,17.38c-4.953,6.352-9.597,13-14.424,19.367c-0.443,0.146,0.248,0.393,0.011,0.518 c-0.299,0.094-0.537,0.227-0.748,0.376c-1.446,2.076-3.043,4.102-4.647,6.245c-0.835,1.117-1.284,2.186-2.929,2.737 c-0.481,0.138,0.504-0.959,0.749-1.312c2.503-3.617,5.564-7.299,8.191-10.892c1.523-2.09,2.881-4.324,4.524-6.322 c1.643-1.997,3.31-4.009,4.789-6.07c0.767-1.063,1.318-2.238,2.082-3.276c2.246-3.068,4.668-6.148,6.869-9.348 c2.943-4.28,5.824-8.561,8.587-12.854c-1-0.251-1.268-1.833-0.432-2.403c-0.72-0.684-1.448-1.51-1.017-2.689 c0.142-0.505,1.126-0.478,1.598-0.775c-0.688-0.705-2.163-0.169-2.196-1.905c0.363-0.516,1.282-0.809,1.874-0.939 c0.379-1.618-1.398-0.67-1.68-1.916c-0.234-1.041,0.977-1.427,1.994-1.8c0.097-1.641-1.693-0.855-1.767-2.314 c-0.067-1.335,2.007-0.822,2.49-1.909c0.308-0.68-1.095-0.584-1.016-1.753c0.288-1.049,2.071-0.842,2.919-1.381 c0.072-1.083-1.907-2.118-0.765-2.954c0.858-0.087,1.51,1.278,2.505,1.42c-0.902-1.354-0.914-3.032,0.405-3.32 c1.121-0.244,1.591,0.929,2.636,1.078c2.996-1.948,7.323-1.104,9.803,0.521c2.567,1.68,5.095,5.71,5.8,10.578 c0.597,4.117-0.277,8.624-2.58,10.367c-4.13,3.127-9.425-0.595-8.979-5.699c0.122-1.422,1.039-3.042,2.09-3.697 c1.883-1.171,3.754-0.116,5.062,0.745c-0.408-1.298-0.401-2.514-0.842-3.771c-1.067-3.05-5.584-4.572-8.757-2.836 c-1.252,0.686-2.804,2.26-3.392,3.468c-0.959,1.969-0.627,4.731-0.335,7.365c0.283,2.557,0.602,5.613,1.344,8.345 c0.69,2.546,1.738,5.147,2.72,7.516c1.028,2.48,2.078,4.851,3.106,6.911c2.039,4.087,4.771,8.349,6.981,12.605 c1.135,2.185,2.057,4.592,3.106,6.911c1.078,2.383,2.259,4.765,2.949,7.152c1.479,5.11,1.589,9.541,1.438,13.43 c4.679,0.146,9.76,0.359,14.71-0.368c-2.005-4.8-4.554-9.903-6.831-14.723c0.461-0.163,1.059,0.502,1.655,0.879 c8.654,5.496,18.097,10.742,26.689,16.436c-10.948,4.885-21.562,9.98-32.51,14.865c-0.334,0.059,0.704-0.964,1.046-1.38 c2.219-2.703,4.624-5.582,6.871-8.409c0.9-1.134,1.846-2.255,2.454-3.464c-4.653-0.226-9.806,0.331-14.608,0.343 c-1.229,4.609-2.723,8.457-4.859,12.755c-0.573,1.148-2.085,2.963-1.903,4.069c0.093,0.556,0.991,1.338,1.459,1.863 c0.602,0.675,1.154,1.308,1.556,1.84c0.829,1.096,2.395,2.897,2.574,4.526c0.22,2.011-2.138,3.806-4.417,4.009 c-0.585,0.053-1.242-0.317-1.799-0.119c-0.771,0.274-1.62,2.396-2.201,3.2c-1.139,1.575-2.695,3.291-5.422,2.773 c-1.022,0.818-1.505,1.807-2.579,2.449c-3.657,2.189-7.658,0.516-10.286-0.826c-4.018,3.417-7.343,9.032-7.979,15.114 c-0.281,2.708-0.866,5.379,0.154,8.613c0.508,1.607,1.372,3.548,2.419,4.772c2.235,2.619,8.699,2.242,11.467-0.894 c0.96-1.089,1.461-2.826,1.958-4.292c0.534-1.576,0.927-3.183,0.624-5.141c-0.633,0.355-0.813,1.219-1.422,1.568 c-2.379,1.37-5.164-0.163-5.946-1.901c-1.175-2.607-0.019-6.4,1.448-7.513c1.51-1.146,3.958-1.088,5.159-0.214 c1.947,1.413,3.775,6.412,3.718,10.109c-0.055,3.49-2.028,8.688-4.189,10.623c-1.426,1.277-2.813,1.773-5.125,2.706 C273.532,241.429,273.4,241.458,273.27,241.487z M316.695,166.371c-0.32-1.848-0.54-3.636-0.92-5.521 c5.441,2.469,10.822,5.75,16.149,7.956c-6.965-4.635-13.854-9.386-20.91-13.873c-0.058,0.019-0.112,0.041-0.076,0.123 C313.027,158.56,314.675,162.76,316.695,166.371z"/> </g> <g id="leftwing"> <path d="M167.683,146.944c2.924,2.335,15.278,17.234,0.549,9.844c6.459,7.061-9.359-2.545-10.374-2.542 c-0.434,0.001-0.823-0.265-1.325-0.328c-1.972-0.265-3.787,1.111-6.085,1.671c-2.588,0.63-5.885,0.685-4.587-1.892 c-1.62,0.21-4.129,1.203-6.229,1.495c-1.311,0.181-3.32,0.195-3.605-0.757c-0.346-1.156,1.447-1.744,1.794-2.69 c-2.729-0.345-7.866,0.96-8.327-2.307c-0.213-1.512,0.982-2.569,2.279-3.321c-3.147,0.005-7.012,0.144-10.553-0.143 c-3.526-0.287-7.121-0.221-9.759-1.259c-1.482-0.583-3.852-2.6-3.875-4.758c-0.009-0.921,1.266-2.727,2.18-3.299 c0.776-0.489,2.073-0.825,3.064-1.204c1.119-0.429,2.253-0.702,3.306-1.053c-2.191-0.988-5.077-0.787-7.984-1.237 c-1.188-0.183-2.753-0.989-4.124-1.683c-1.422-0.719-2.718-1.25-3.796-2.068c-2.407-1.833-5.358-5.898-4.2-9.478 c0.761-2.347,3.483-3.48,6.601-4.494c-1.922-1.379-4.84-2.558-7.106-4.767c-2.172-2.117-4.698-4.011-5.664-7.171 c-1.28-4.187-0.161-9.019,4.411-9.629c4.015-0.538,7.277,2.334,10.345,3.417c-6.267-5.425-13.32-13.841-15.255-26.799 c-0.237-1.586-0.167-3.263-0.026-4.785c0.128-1.404,0.273-3.066,0.7-4.322c0.87-2.563,3.348-4.542,6.181-5.443 c2.577-0.818,5.554-0.181,6.342,1.813c0.173,0.441,0.127,1.067,0.232,1.51c1.028,4.313,2.734,8.313,4.082,12.212 c1.318,3.814,3.224,7.409,4.928,10.878c0.908,1.844,1.527,3.79,2.476,5.487c1.812,3.238,3.592,6.646,5.446,9.929 c0.877,1.549,2.077,2.906,3.148,4.296c2.174,2.824,4.252,5.581,6.7,8.087c2.408,2.464,4.505,5.217,7.165,7.357 c2.635,2.12,5.399,3.854,8.242,5.658c2.073,1.315,4.193,2.596,6.543,3.642c0.734,0.328,1.658,0.514,2.293,0.947 c1.232,0.835,2.867,2.605,3.444,4.229c0.55,1.542,0.611,3.206,1.042,4.663C159.934,142.184,164.104,144.558,167.683,146.944z M98.034,72.929c0.518,1.152,0.856,2.373,1.393,3.439c0.987,1.965,2.396,3.678,3.611,5.441c2.633,3.824,5.15,7.541,7.839,9.915 c-3.313-5.535-6.973-11.853-9.372-19.571c-1.051-3.383-1.701-8.531-4.893-8.385C94.511,65.645,97.008,70.64,98.034,72.929z M95.8,98.841c-1.161,2.356,2.447,2.631,4.17,2.819c3.074,0.332,6.309,1.809,8.67,2.438C104.635,101.912,101.057,99.054,95.8,98.841 z M103.044,119.617c-0.79,1.362,0.267,4.081,1.46,4.673c-0.763-4.937,6.078-3.951,8.641-3.283 C110.29,119.89,106.938,118.212,103.044,119.617z"/> </g> </g> </g> </svg>';
    var cupidShadowHtml = '<svg id="cupid-shadow" width="170px" height="30px" viewBox="0 0 340 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><ellipse id="shadow" fill="#CCC" fill-opacity=".3" cx="170px" cy="30px" rx="100" ry="15"></ellipse></svg>';
    var balloonsHtml = '<svg version="1.0" id="balloons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="125px" height="184px" viewBox="0 0 125 184" enable-background="new 0 0 125 184" xml:space="preserve"><g id="HeartBalloons"><g id="balloon1"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#5E0618" points="36.497,54.138 36.943,54.044 61.448,176.449 60.999,176.541 "/><path fill-rule="evenodd" clip-rule="evenodd" fill="#C62026" d="M33.929,51.854l6.083-0.345c0,0-2.254,3.483-0.285,5.143 c1.969,1.655,3.028,2.295,3.028,2.295s-1.656,1.97-3.447,1.301c-1.793-0.667-3.092-0.917-4.189,0.089 c-1.098,1.011-2.942,0.805-2.942,0.805s1.71-1.335,2.227-2.75C34.918,56.977,35.104,53.854,33.929,51.854z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#C62026" d="M33.551,15.164c-16.748-30.941-58.167,10.371-9.982,33.487 c13.566,6.507,13.544,6.274,13.544,6.274s12.778-9.378,15.895-11.659C90.443,15.85,47.074-18.963,33.551,15.164z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#DB4E4E" d="M60.208,23.774c7.406-18.476-17.011-28.702-26.094-5.775 C24.148-0.41,2.47,9.813,6.598,23.679c1.132,3.807,3.041,6.026,6.505,7.745C35.371,42.469,44.532-7.623,60.208,23.774z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#5E0618" d="M34.852,53.933l3.933-0.34c0.331-0.03,0.623,0.167,0.647,0.434 c0.021,0.267-0.231,0.51-0.564,0.537l-3.929,0.343c-0.332,0.029-0.625-0.167-0.647-0.434v-0.001 C34.268,54.204,34.521,53.961,34.852,53.933z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#F9C0C7" d="M14.523,10.53C4.571,14.836,0.242,33.089,24.969,45.342 C7.498,33.756,8.592,19.931,16.569,15.246C22.744,11.619,19.969,8.171,14.523,10.53z"/></g><g id="balloon2"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#5E0618" points="89.406,70.563 89.797,70.68 60.628,174.033 60.239,173.918 "/><path fill-rule="evenodd" clip-rule="evenodd" fill="#C62026" d="M87.688,71.813l4.668,1.739c0,0-2.831,1.867-1.898,3.754 c0.931,1.884,1.512,2.711,1.512,2.711s-1.884,0.935-3.006-0.153c-1.124-1.088-2.014-1.703-3.168-1.309 c-1.152,0.396-2.465-0.364-2.465-0.364s1.717-0.439,2.566-1.331C86.749,75.973,87.912,73.693,87.688,71.813z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#C62026" d="M99.442,44.215c-2.393-28.664-46.961-11.316-18.461,21.8 c8.023,9.324,8.084,9.141,8.084,9.141s12.646-2.829,15.727-3.516C141.816,63.392,120.763,23.093,99.442,44.215z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#DB4E4E" d="M116.578,59.407c11.607-11.408-3.321-27.074-17.646-12.887 c-1.425-17.054-21.014-16.508-22.468-4.774c-0.4,3.224,0.3,5.51,2.331,7.935C91.848,65.256,115.14,30.752,116.578,59.407z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#5E0618" d="M87.699,73.67l3.054,1.035c0.261,0.089,0.413,0.329,0.343,0.536 v0.001c-0.07,0.21-0.338,0.306-0.597,0.22l-3.057-1.035c-0.258-0.086-0.412-0.327-0.341-0.537 C87.168,73.682,87.438,73.585,87.699,73.67z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#F9C0C7" d="M86.942,35.064c-8.768-0.275-18.222,11.591-4.347,29.077 c-8.796-14.498-3.232-24.238,4.218-24.919C92.583,38.694,91.74,35.216,86.942,35.064z"/></g><g id="balloon3"><rect x="57.802" y="113.832" transform="matrix(-0.9958 0.0911 -0.0911 -0.9958 129.0662 285.0101)" fill-rule="evenodd" clip-rule="evenodd" fill="#5E0618" width="0.45" height="63.238"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#C62026" d="M52.401,110.339l4.974-0.245c0,0-1.861,2.835-0.262,4.201 c1.6,1.365,2.462,1.895,2.462,1.895s-1.365,1.603-2.826,1.047c-1.461-0.557-2.521-0.77-3.425,0.047 c-0.903,0.818-2.411,0.637-2.411,0.637s1.407-1.078,1.837-2.234C53.181,114.536,53.353,111.983,52.401,110.339z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#C62026" d="M52.308,80.345c-13.515-25.392-47.616,8.143-8.357,27.317 c11.054,5.399,11.037,5.208,11.037,5.208s10.498-7.592,13.059-9.438C98.811,81.238,63.559,52.525,52.308,80.345z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#DB4E4E" d="M74.048,87.54c6.16-15.064-13.741-23.563-21.298-4.875 c-8.041-15.106-25.824-6.874-22.527,4.484c0.902,3.119,2.449,4.944,5.271,6.368C53.635,102.676,61.416,61.78,74.048,87.54z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#5E0618" d="M53.146,112.045l3.215-0.255c0.271-0.021,0.509,0.141,0.525,0.358 l0,0c0.018,0.219-0.191,0.416-0.464,0.438l-3.217,0.254c-0.271,0.021-0.508-0.141-0.523-0.356 C52.662,112.264,52.872,112.069,53.146,112.045z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#F9C0C7" d="M36.88,76.28c-8.394,3.632-12.044,19.026,8.81,29.36 c-14.734-9.77-13.813-21.429-7.085-25.383C43.813,77.197,41.474,74.291,36.88,76.28z"/></g><g id="balloonRibbon"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="63.2275" y1="169.9707" x2="77.8501" y2="169.9707"><stop offset="0" style="stop-color:#F8AFB0"/><stop offset="1" style="stop-color:#DB4E4E"/></linearGradient><path fill-rule="evenodd" clip-rule="evenodd" fill="url(#SVGID_1_)" d="M63.228,169.164c0,0,0.901-7.053,4.503-5.443 c3.604,1.609,1.608,3.768,3.091,5.379c1.479,1.611,10.545,1.521,5.533,5.348c-5.013,3.822-12.418,1.029-12.418,1.029 L63.228,169.164z"/><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="48.0576" y1="177.9814" x2="68.2732" y2="170.4353"><stop offset="0" style="stop-color:#F8AFB0"/><stop offset="1" style="stop-color:#DB4E4E"/></linearGradient><path fill-rule="evenodd" clip-rule="evenodd" fill="url(#SVGID_2_)" d="M51.064,169.145c-5.716,1.029-9.164,2.57-5.967,5.314 c3.193,2.744,6.722,0.773,5.967,3.631c-0.756,2.855,4.709,7.398,6.138,4.086c1.43-3.316,2.855-7.088,2.855-7.088 C57.614,172.678,55.877,168.277,51.064,169.145z"/><linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="56.1689" y1="172.2402" x2="65.4082" y2="172.2402"><stop offset="0" style="stop-color:#F8AFB0"/><stop offset="1" style="stop-color:#DB4E4E"/></linearGradient><path fill-rule="evenodd" clip-rule="evenodd" fill="url(#SVGID_3_)" d="M64.401,168.783c1.706,3.23,1.868,8.336-4.58,8.344 c-1.249,0.002-4.445-6.336-3.47-7.379C57.969,168.014,62.866,165.883,64.401,168.783z"/></g></g></svg>';
    var welcomeHtml = '<div id="welcome-main"><canvas id="welcome-canvas"></canvas></div>';
    var welcomeText = '<div id="welcome-text-main"><img class="welcome-text" src="data:image/png;base64,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"/></div>';

    function moveCupid($this, loc) {
        var opt = $this.options;

        if (!opt._isAnimating) {
            $("#cupid-main").attr("class", loc);
            $("#cupid-shadow").attr("class", loc);

            opt._isAnimating = true;
            opt.cupidLocation = loc;
        }
    }

    function moveBalloons($this, loc) {
        var opt = $this.options;

        $("#balloons").attr("class", loc);
        opt.balloonsLocation = loc;
    }

    function renderWelcome($this) {
        var opt = $this.options;
        var loopCount = 0;

        function hideWelcome() {
            opt.welcome.fadeOut(800, function () {
                if (opt.welcome.length) {
                    clearInterval(si);
                    opt.welcome.remove();
                    opt.welcomeText.remove();
                }
            });
            opt.welcomeText.fadeOut(800);
        }

        if (opt.showWelcome && typeof (sessionStorage) !== "undefined" && !sessionStorage.cupidWelcomeShown) {
            opt.welcome = $(welcomeHtml);
            if (opt.welcomeText == "Happy Valentines Day") {
                opt.welcomeText = $(welcomeText);
            } else {
                opt.welcomeText = $('<div id="welcome-text-main"><div class="welcome-text">' + opt.welcomeText + '</div></div>');
            }
            $("body").append(opt.welcome).append(opt.welcomeText);
            sessionStorage.cupidWelcomeShown = true;

            opt.welcome.on("click.cupid", function () {
                hideWelcome();
            });

            var c = document.getElementById('welcome-canvas');
            var b = document.body;
            var a = c.getContext('2d');
            var si;
            var e = [];
            var h = [];
            var O = c.width = innerWidth;
            var Q = c.height = innerHeight;
            var v = 32;
            var M = Math;
            var R = M.random;
            var C = M.cos;
            var Y = 6.3;
            for (var i = 0; i < Y; i += 0.2) h.push([O / 2 + 180 * M.pow(M.sin(i), 3), Q / 2 + 10 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);
            for (i = 0; i < v;) {
                var x = R() * O;
                var y = R() * Q;
                var H = 80 * (i / v) + 280;
                var S = 40 * R() + 60;
                var B = 60 * R() + 20;
                var f = [];
                for (var k = 0; k < v;) f[k++] = { x: x, y: y, X: 0, Y: 0, R: 1 - k / v + 1, S: R() + 1, q: ~~(R() * v), D: 2 * (i % 2) - 1, F: 0.2 * R() + 0.7, f: "hsla(" + ~~H + "," + ~~S + "%," + ~~B + "%,.1)" };
                e[i++] = f
            }
            function _(d) {
                a.fillStyle = d.f;
                a.beginPath();
                a.arc(d.x, d.y, d.R, 0, Y, 1);
                a.closePath();
                a.fill()
            }

            si = setInterval(function () {
                a.fillStyle = "rgba(0,0,0,.2)";
                a.fillRect(0, 0, O, Q);
                for (i = v; i--;) {
                    f = e[i];
                    var u = f[0];
                    var q = h[u.q];
                    var D = u.x - q[0];
                    var E = u.y - q[1];
                    var G = M.sqrt(D * D + E * E);
                    10 > G && (0.95 < R() ? u.q = ~~(R() * v) : (0.99 < R() && (u.D *= -1), u.q += u.D, u.q %= v, 0 > u.q && (u.q += v)));
                    u.X += -D / G * u.S;
                    u.Y += -E / G * u.S;
                    u.x += u.X;
                    u.y += u.Y;
                    _(u);
                    u.X *= u.F;
                    u.Y *= u.F;
                    for (k = 0; k < v - 1;) T = f[k], N = f[++k], N.x -= 0.7 * (N.x - T.x), N.y -= 0.7 * (N.y - T.y), _(N)
                }
                loopCount += 1;
                if (loopCount == 100) {
                    opt.welcomeText.fadeIn(400);
                }
                if (loopCount > 240) {
                    hideWelcome();
                }
            }, 25);
        }
    }

    function renderCupid($this) {
        var opt = $this.options;

        if (opt.showCupid) {
            opt.cupid = $(cupidHtml);
            opt.cupidShadow = $(cupidShadowHtml);

            opt.cupid.find("#canvas").attr("fill", opt.cupidColor);
            opt.cupid.find("#hearts").attr("fill", opt.cupidHeartsColor);
            opt.cupid.attr({
                "width": opt.cupidSize + "px",
                "height": opt.cupidSize + "px",
                "class": "init-" + opt.cupidLocation
            });
            opt.cupidShadow.attr({
                "width": opt.cupidSize + "px",
                "height": ((opt.cupidSize * 30) / defaults.cupidSize) + "px",
                "style": 'top: ' + opt.cupidSize + "px",
                "class": "init-" + opt.cupidLocation
            });


            $("body").append(opt.cupid).append(opt.cupidShadow);

            if (opt.cupidMoveOnHover) {
                // move cupid to proper position to avoid screen block
                $("body").on("mousemove.cupid", function (e) {
                    if (e.clientX < opt.cupidSize && e.clientY < opt.cupidSize && opt.cupidLocation == "left") {
                        moveCupid($this, "right");
                    }
                    else if ((e.clientX > opt._windowWidth - opt.cupidSize) && e.clientY < opt.cupidSize && opt.cupidLocation == "right") {
                        moveCupid($this, "left");
                    }
                });
                opt.cupid.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                    opt._isAnimating = false;
                });
            }

        }
    }

    function renderBalloons($this) {
        var opt = $this.options;

        if (opt.showBalloons) {
            opt.balloons = $(balloonsHtml);
            opt.balloons.attr({
                "class": opt.balloonsLocation
            });
            $("body").append(opt.balloons);
        }

        if (opt.moveBalloonsOnHover) {
            $("body").on("mousemove.HeartBalloons", function (e) {
                if (e.clientX < 125 && e.clientY > ($(window).height() - 125) && opt.balloonsLocation == "left") {
                    moveBalloons($this, "right");
                }
                else if (e.clientX > ($(window).width() - 125) && e.clientY > ($(window).height() - 184) && opt.balloonsLocation == "right") {
                    moveBalloons($this, "left");
                }
            });
        }
    }

    function declareEvents($this) {
        var opt = $this.options;

        $(window).on("resize.cupid", function () {
            opt._windowWidth = $(window).width();
        });

    }

    var methods = {
        init: function (options) {

            return this.each(function () {

                var $this = $(this);

                var data = $this.data('cupidify');
                var opt = $this.options = $.extend({}, defaults, options);

                // If the plugin hasn't been initialized yet
                if (!data) {
                    $this.data('cupidify', $this);
                }

                // check date range before doing anything
                var currentDate = new Date();
                opt.startDate = new Date(opt.startDate.year, opt.startDate.month - 1, opt.startDate.day);
                opt.endDate = new Date(opt.endDate.year, opt.endDate.month - 1, opt.endDate.day);
                opt.endDate.setDate(opt.endDate.getDate() + 1);
                opt.cupidSize = +(opt.cupidSize);
                opt._isAnimating = false;
                opt._windowWidth = $(window).width();

                if (currentDate >= opt.startDate && currentDate < opt.endDate) {
                    // we are within range. Lets do the magic
                    renderWelcome($this);
                    renderCupid($this);
                    renderBalloons($this);
                    declareEvents($this);
                }

            });
        },
        destroy: function () {
            return this.each(function () {

                var $this = $(this).data('cupidify');
                if (!$this)
                    return;

                try {
                    // TODO: destroy routine
                    var opt = $this.options;
                    opt.cupid.remove();
                    opt.cupidShadow.remove();
                    opt.welcome.remove();
                    opt.welcomeText.remove();
                    opt.balloons.remove();
                    $this.removeData('cupidify');
                }
                catch (err) {
                    alert(err.message);
                }
                // other destroy routines

            })
        }

    };

    $.fn.cupidify = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.cupidify');
        }
    };
})(jQuery);