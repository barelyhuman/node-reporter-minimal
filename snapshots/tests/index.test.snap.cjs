exports[`spawn with reporter 1`] = `"[2m
> Test [22m[1mtests/__spec__/basic.test.js
[22m[32m√ [39mall passing[2m [22m
[31mx [39mlevel 1 fails[2m [22m
    [31mx [39mfail 1
    [2mtests/__spec__/basic.test.js:18:3[22m
[31m    Error [ERR_TEST_FAILURE]: The expression evaluated to a falsy value:
     
       assert.ok(!1)
     
[39m[31mx [39mlevel 1 multi assertion, single failure[2m [22m
    [31mx [39mfail 1
    [2mtests/__spec__/basic.test.js:28:3[22m
[31m    Error [ERR_TEST_FAILURE]: The expression evaluated to a falsy value:
     
       assert.ok(!1)
     
[39m[31mx [39mlevel 2 fails[2m [22m
    [31mx [39mnested level[2m [22m
          [31mx [39mfailed level 1
          [2mtests/__spec__/basic.test.js:44:5[22m
[31m          Error [ERR_TEST_FAILURE]: The expression evaluated to a falsy value:
           
             assert.ok(!1)
           
[39m[32m√ [39masync work[2m [22m
"`
