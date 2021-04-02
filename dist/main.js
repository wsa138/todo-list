(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var a=t(n);return!isNaN(a)}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function r(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var i,o={date:r({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:r({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:r({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},u={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function s(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=r.width?String(r.width):i;a=e.formattingValues[o]||e.formattingValues[i]}else{var u=e.defaultWidth,s=r.width?String(r.width):e.defaultWidth;a=e.values[s]||e.values[u]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function c(e){return function(t,n){var a=String(t),r=n||{},i=r.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],u=a.match(o);if(!u)return null;var s,c=u[0],d=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(d)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(c))return n}(d):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(c))return n}(d),s=e.valueCallback?e.valueCallback(s):s,{value:s=r.valueCallback?r.valueCallback(s):s,rest:a.slice(c.length)}}}const d={code:"en-US",formatDistance:function(e,t,n){var r;return n=n||{},r="string"==typeof a[e]?a[e]:1===t?a[e].one:a[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:o,formatRelative:function(e,t,n,a){return u[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:s({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:s({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:s({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:s({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:s({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(i.matchPattern);if(!r)return null;var o=r[0],u=n.match(i.parsePattern);if(!u)return null;var s=i.valueCallback?i.valueCallback(u[0]):u[0];return{value:s=a.valueCallback?a.valueCallback(s):s,rest:n.slice(o.length)}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function l(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function m(n,a){e(2,arguments);var r=t(n).getTime(),i=l(a);return new Date(r+i)}function h(t,n){e(2,arguments);var a=l(n);return m(t,-a)}function f(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}const g=function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return f("yy"===t?a%100:a,t.length)},w=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):f(n+1,2)},v=function(e,t){return f(e.getUTCDate(),t.length)},y=function(e,t){return f(e.getUTCHours()%12||12,t.length)},b=function(e,t){return f(e.getUTCHours(),t.length)},p=function(e,t){return f(e.getUTCMinutes(),t.length)},T=function(e,t){return f(e.getUTCSeconds(),t.length)},C=function(e,t){var n=t.length,a=e.getUTCMilliseconds();return f(Math.floor(a*Math.pow(10,n-3)),t.length)};var M=864e5;function k(n){e(1,arguments);var a=1,r=t(n),i=r.getUTCDay(),o=(i<a?7:0)+i-a;return r.setUTCDate(r.getUTCDate()-o),r.setUTCHours(0,0,0,0),r}function E(n){e(1,arguments);var a=t(n),r=a.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(r+1,0,4),i.setUTCHours(0,0,0,0);var o=k(i),u=new Date(0);u.setUTCFullYear(r,0,4),u.setUTCHours(0,0,0,0);var s=k(u);return a.getTime()>=o.getTime()?r+1:a.getTime()>=s.getTime()?r:r-1}function x(t){e(1,arguments);var n=E(t),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var r=k(a);return r}var P=6048e5;function D(n,a){e(1,arguments);var r=a||{},i=r.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:l(o),s=null==r.weekStartsOn?u:l(r.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=t(n),d=c.getUTCDay(),m=(d<s?7:0)+d-s;return c.setUTCDate(c.getUTCDate()-m),c.setUTCHours(0,0,0,0),c}function S(n,a){e(1,arguments);var r=t(n,a),i=r.getUTCFullYear(),o=a||{},u=o.locale,s=u&&u.options&&u.options.firstWeekContainsDate,c=null==s?1:l(s),d=null==o.firstWeekContainsDate?c:l(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=new Date(0);m.setUTCFullYear(i+1,0,d),m.setUTCHours(0,0,0,0);var h=D(m,a),f=new Date(0);f.setUTCFullYear(i,0,d),f.setUTCHours(0,0,0,0);var g=D(f,a);return r.getTime()>=h.getTime()?i+1:r.getTime()>=g.getTime()?i:i-1}function U(t,n){e(1,arguments);var a=n||{},r=a.locale,i=r&&r.options&&r.options.firstWeekContainsDate,o=null==i?1:l(i),u=null==a.firstWeekContainsDate?o:l(a.firstWeekContainsDate),s=S(t,n),c=new Date(0);c.setUTCFullYear(s,0,u),c.setUTCHours(0,0,0,0);var d=D(c,n);return d}var N=6048e5;function L(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),i=a%60;if(0===i)return n+String(r);var o=t||"";return n+String(r)+o+f(i,2)}function W(e,t){return e%60==0?(e>0?"-":"+")+f(Math.abs(e)/60,2):O(e,t)}function O(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+f(Math.floor(r/60),2)+n+f(r%60,2)}const Y={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return g(e,t)},Y:function(e,t,n,a){var r=S(e,a),i=r>0?r:1-r;return"YY"===t?f(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):f(i,t.length)},R:function(e,t){return f(E(e),t.length)},u:function(e,t){return f(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return f(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return f(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return w(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return f(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(n,a,r,i){var o=function(n,a){e(1,arguments);var r=t(n),i=D(r,a).getTime()-U(r,a).getTime();return Math.round(i/N)+1}(n,i);return"wo"===a?r.ordinalNumber(o,{unit:"week"}):f(o,a.length)},I:function(n,a,r){var i=function(n){e(1,arguments);var a=t(n),r=k(a).getTime()-x(a).getTime();return Math.round(r/P)+1}(n);return"Io"===a?r.ordinalNumber(i,{unit:"week"}):f(i,a.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):v(e,t)},D:function(n,a,r){var i=function(n){e(1,arguments);var a=t(n),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var i=a.getTime(),o=r-i;return Math.floor(o/M)+1}(n);return"Do"===a?r.ordinalNumber(i,{unit:"dayOfYear"}):f(i,a.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return f(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return f(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return f(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return y(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):b(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):f(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):f(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):p(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):T(e,t)},S:function(e,t){return C(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return W(r);case"XXXX":case"XX":return O(r);case"XXXXX":case"XXX":default:return O(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return W(r);case"xxxx":case"xx":return O(r);case"xxxxx":case"xxx":default:return O(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+L(r,":");case"OOOO":default:return"GMT"+O(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+L(r,":");case"zzzz":default:return"GMT"+O(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return f(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return f((a._originalDate||e).getTime(),t.length)}};function j(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function q(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const B={p:q,P:function(e,t){var n,a=e.match(/(P+)(p+)?/),r=a[1],i=a[2];if(!i)return j(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",j(r,t)).replace("{{time}}",q(i,t))}};var H=6e4;function z(e){return e.getTime()%H}function X(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var a=n>0?(H+z(t))%H:z(t);return n*H+a}var I=["D","DD"],A=["YY","YYYY"];function F(e){return-1!==I.indexOf(e)}function Q(e){return-1!==A.indexOf(e)}function G(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var R=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,J=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,_=/^'([^]*?)'?$/,V=/''/g,$=/[a-zA-Z]/;function K(e){return e.match(_)[1].replace(V,"'")}!function(){const a=document.getElementById("date"),r=document.getElementById("addProject"),i=document.querySelector(".projects-modal"),o=document.getElementById("addTaskBtn"),u=document.querySelector(".tasks-modal"),s=document.getElementsByClassName("close-btn"),c=document.getElementById("proj-submit-btn"),m=document.getElementById("project-form"),f=document.getElementById("newProject"),g=document.getElementById("task-submit-btn"),w=document.getElementById("task-form"),v=document.getElementById("newTaskName"),y=document.getElementById("newTaskDate"),b=document.getElementById("newTaskTime"),p=document.getElementById("newTaskNotes"),T=(document.getElementById("tasks-list"),document.getElementById("projects-menu")),C=document.getElementById("tasks-section"),M=[],k=function(a,r,i){e(2,arguments);var o=String(r),u=i||{},s=u.locale||d,c=s.options&&s.options.firstWeekContainsDate,m=null==c?1:l(c),f=null==u.firstWeekContainsDate?m:l(u.firstWeekContainsDate);if(!(f>=1&&f<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=s.options&&s.options.weekStartsOn,w=null==g?0:l(g),v=null==u.weekStartsOn?w:l(u.weekStartsOn);if(!(v>=0&&v<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var y=t(a);if(!n(y))throw new RangeError("Invalid time value");var b=X(y),p=h(y,b),T={firstWeekContainsDate:f,weekStartsOn:v,locale:s,_originalDate:y};return o.match(J).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,B[t])(e,s.formatLong,T):e})).join("").match(R).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return K(e);var n=Y[t];if(n)return!u.useAdditionalWeekYearTokens&&Q(e)&&G(e,r,a),!u.useAdditionalDayOfYearTokens&&F(e)&&G(e,r,a),n(p,e,s.localize,T);if(t.match($))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("")}(new Date,"EEEE MM/dd/yyyy");a.innerHTML=`${k}`,r.addEventListener("click",(function(){D(i,"flex")})),o.addEventListener("click",(function(){D(u,"flex")})),Array.from(s).forEach((function(e){e.addEventListener("click",(function(){P(i),P(u)}))})),c.addEventListener("click",(function(e){if(e.preventDefault(),!z(f.value))return;H(),((e,t)=>{let n=(e=>({name:e,projectTasksArr:[]}))(e);t.push(n)})(f.value,M);let t=M[M.length-1];E(t),O(),j(f.value),P(i),m.reset()})),g.addEventListener("click",(function(e){if(e.preventDefault(),z(v.value)){if(S()){H();let e=I(b.value),t={name:v.value,date:y.value,time:e,notes:p.value},n=document.querySelector(".tasks-header").innerHTML;for(let e=0;e<M.length;e++)if(M[e].name===n){M[e].projectTasksArr.push(t),q(M[e]);break}}P(u),w.reset()}}));const E=e=>{let t=document.createElement("li"),n=document.createElement("div");n.className="project-text",n.innerHTML=e.name,t.className="project",t.appendChild(n),T.appendChild(t),U(t,e),x(e,t),e.element=t},x=(e,t)=>{t.addEventListener("click",(function(){O(),j(e.name),q(e)}))},P=e=>{e.style.display="none"},D=(e,t)=>{e.style.display=t},S=()=>0!==M.length||(alert("Select or create a project before adding tasks."),!1),U=(e,t)=>{let n=document.createElement("button");n.innerHTML="&#10003",n.className="proj-btn",n.id="complete-btn";let a=document.createElement("button");a.innerHTML="&#8722",a.className="proj-btn",a.id="delete-btn";let r=document.createElement("div");r.className="proj-finish-container",e.appendChild(r),r.appendChild(n),r.appendChild(a),N(n),L(a,t)},N=e=>{e.addEventListener("click",(function(){e.parentElement.parentElement.classList.toggle("completed")}))},L=(e,t)=>{e.addEventListener("click",(n=>{n.stopPropagation(),confirm("Are you sure you want to delete this project?")&&(W(t),e.parentElement.parentElement.remove())}))},W=e=>{let t=document.querySelector(".tasks-header");M.forEach((function(n){n===e&&(M.splice(M.indexOf(n),1),n.name===t.innerHTML&&(t.remove(),H()))}))},O=()=>{"H2"===C.childNodes[0].tagName&&C.removeChild(C.childNodes[0])},j=e=>{let t=document.createElement("h2");t.className="tasks-header",t.innerHTML=e,C.prepend(t)},q=e=>{H();let t=document.getElementById("tasks-list"),n=M.indexOf(e);((e,t)=>{let n=e.projectTasksArr;n.forEach((function(e){let a=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div"),o=document.createElement("div"),u=document.createElement("div"),s=document.createElement("div"),c=document.createElement("button"),d=document.createElement("button");var l;a.className="task",r.className="task-name",i.className="task-date",o.className="task-time",u.className="task-notes",s.className="finish-container",c.id="task-complete",d.id="task-delete",r.innerHTML=e.name,i.innerHTML=e.date,o.innerHTML=e.time,u.innerHTML=e.notes,c.innerHTML="&#10003",d.innerHTML="&#8722",a.appendChild(r),a.appendChild(i),a.appendChild(o),a.appendChild(u),s.appendChild(c),s.appendChild(d),a.appendChild(s),t.appendChild(a),(l=c).addEventListener("click",(()=>{l.parentElement.parentElement.classList.toggle("completed")})),((e,t,n,a)=>{e.addEventListener("click",(()=>{t.remove();let e=a.indexOf(n);a.splice(e,1),console.log(a)}))})(d,a,e,n)}))})(M[n],t)},H=()=>{let e=document.getElementById("tasks-list");for(;e.firstChild;)e.removeChild(e.lastChild)},z=e=>!(e.length<1&&(alert("Please enter a name"),1)),I=e=>{let t=e.split(":"),n=t[0],a=t[1],r="";return n>12?(r="PM",n-12+":"+a+" "+r):(r="AM",n+":"+a+" "+r)}}()})();