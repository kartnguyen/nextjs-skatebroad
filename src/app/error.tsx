"use client";

import Link from "next/link";
import { Button, Result } from "antd";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary">
            <Link href={"/"}>Back Home</Link>
          </Button>
        }
      />
    </html>
  );
}
