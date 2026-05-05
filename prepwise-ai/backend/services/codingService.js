exports.runCode = (userCode, question) => {
  try {
    // ✅ Step 1: Basic validation BEFORE eval
    if (!userCode.includes("function")) {
      return {
        error: "Invalid format. Use: function solve(a, b) {}"
      };
    }

    if (!userCode.includes("solve")) {
      return {
        error: "Function must be named 'solve'"
      };
    }

    // ✅ Step 2: Safe eval
    let func;
    try {
      func = eval(`(${userCode})`);
    } catch (e) {
      return {
        error: "Syntax Error in code",
        details: e.message
      };
    }

    // ✅ Step 3: Check function type
    if (typeof func !== "function") {
      return {
        error: "Invalid function"
      };
    }

    // ✅ Step 4: Run test cases
    let passed = 0;
    let results = [];

    question.testCases.forEach((tc) => {
      try {
        const output = func(...tc.input);
        const isCorrect = output == tc.output;

        if (isCorrect) passed++;

        results.push({
          input: tc.input,
          output,
          expected: tc.output,
          isCorrect
        });
      } catch (err) {
        results.push({
          input: tc.input,
          output: "Error",
          expected: tc.output,
          isCorrect: false
        });
      }
    });

    const score = Math.round(
      (passed / question.testCases.length) * 100
    );

    return {
      results,
      score
    };

  } catch (err) {
    return {
      error: "Code execution failed",
      details: err.message
    };
  }
};