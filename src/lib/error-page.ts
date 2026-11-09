
export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Something went wrong | 3FoundersLab</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    main {
      max-width: 480px;
    }

    h1 {
      font-size: 28px;
      margin-bottom: 12px;
    }

    p {
      color: #64748b;
      line-height: 1.6;
    }

    a {
      display: inline-block;
      margin-top: 16px;
      padding: 12px 24px;
      border-radius: 8px;
      background: #2563eb;
      color: white;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <main>
    <h1>Something went wrong</h1>
    <p>We're sorry, but an unexpected error occurred. Please try again.</p>
    <a href="/">Return to Home</a>
  </main>
</body>
</html>`;
}
