import traceback
try:
    import fastapi
    print("OK")
except Exception:
    with open("err_log.txt", "w", encoding="utf-8") as f:
        f.write(traceback.format_exc())
