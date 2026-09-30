import * as std from "std";
import * as os from "os";

// NOTE(be cautious about loop based event trigger)
os.setReadHandler (std.in.fileno(), stdin_handler);

function stdin_handler()
{
    var json_body = std.in.readAsString();
    var expr_decl = "var a = " + json_body + ";";
    var expr_user = scriptArgs[1].trim();
    if ([".", "["].includes(expr_user[0]))
    {
        expr_user = "a" + expr_user;
    }
    expr_user += ";";
    var full_expr = expr_decl + expr_user;
    let eval_result = std.evalScript(full_expr);
    console.log(eval_result);
    std.exit(0);
}
