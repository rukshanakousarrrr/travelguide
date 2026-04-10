/** Admin login has its own minimal layout — no sidebar, no shell. */
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
