

import * as std from "std";
import * as os from "os";


var term_fd = std.in.fileno();

/* install a handler to read stdin */
var term_read_buf = new Uint8Array(64);
os.setReadHandler(term_fd, term_read_handler);



function term_read_handler() {
    var l, i;
    // console.log("osread before");
    l = os.read(term_fd, term_read_buf.buffer, 0, term_read_buf.length);
    // console.log("osread after");
    for (i = 0; i < l; i++)
    {
        var b = term_read_buf[i];
        var c = String.fromCodePoint(b);
        console.log("byte", b, "char", c);
    }
    // std.puts(111); // TOFIX:
}


function handle_byte(c) {
    if (!utf8) {
        handle_char(c);
    } else if (utf8_state !== 0 && (c >= 0x80 && c < 0xc0)) {
        utf8_val = (utf8_val << 6) | (c & 0x3F);
        utf8_state--;
        if (utf8_state === 0) {
            handle_char(utf8_val);
        }
    } else if (c >= 0xc0 && c < 0xf8) {
        utf8_state = 1 + (c >= 0xe0) + (c >= 0xf0);
        utf8_val = c & ((1 << (6 - utf8_state)) - 1);
    } else {
        utf8_state = 0;
        handle_char(c);
    }
}
