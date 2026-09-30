include Makefile

.DEFAULT_GOAL := qjsq$(EXE)

# -e emits main() plus the module bytecode. repl.c uses -c because qjs.c
# supplies main; a standalone binary has to carry its own.
qjsq.c: $(QJSC) qjsq.js
	$(QJSC) -s -e -o $@ -m qjsq.js

qjsq$(EXE): $(OBJDIR)/qjsq.o $(QJS_LIB_OBJS)
	$(CC) $(LDFLAGS) $(LDEXPORT) -o $@ $^ $(LIBS)
