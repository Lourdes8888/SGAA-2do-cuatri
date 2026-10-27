import Footer from "../components/footer"
import Header from "../components/Header"

export default function LayoutPpal({ children }) {
  return (
    <main className="student-app">
      <Header />
      <div className="student-content">{children}</div>
      <Footer />
    </main>
  )
}
