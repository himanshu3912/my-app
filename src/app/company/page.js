export default function CompanyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Our Company</h1>
      
      <p className="text-slate-700 max-w-3xl text-center mb-6">
        Welcome to our company! My name is Himanshu and I am a Digital Marketer 
        passionate about helping businesses grow through innovative strategies, 
        creative campaigns, and data-driven solutions. Our company believes in 
        building strong connections with clients, understanding their goals, and 
        delivering measurable results. We focus on digital transformation, 
        ensuring that every brand we work with stands out in today’s competitive 
        online marketplace.
      </p>

      <p className="text-slate-700 max-w-3xl text-center mb-6">
        Over the years, we have collaborated with startups, small businesses, 
        and established enterprises to design marketing strategies that truly 
        make an impact. From social media management and SEO optimization to 
        content creation and paid advertising, our services are tailored to 
        meet diverse business needs. We believe that success comes from 
        consistency, creativity, and a customer-first approach.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-8 mb-4">Our Core Values</h2>
      <table className="table-auto border-collapse border border-slate-400 text-slate-700">
        <thead>
          <tr>
            <th className="border border-slate-400 px-4 py-2 bg-green-100">Value</th>
            <th className="border border-slate-400 px-4 py-2 bg-green-100">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-400 px-4 py-2">Innovation</td>
            <td className="border border-slate-400 px-4 py-2">
              We constantly explore new ideas and technologies to keep our clients ahead of the curve.
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 px-4 py-2">Integrity</td>
            <td className="border border-slate-400 px-4 py-2">
              Transparency and honesty are at the heart of everything we do.
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 px-4 py-2">Customer Success</td>
            <td className="border border-slate-400 px-4 py-2">
              We measure our success by the growth and satisfaction of our clients.
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 px-4 py-2">Collaboration</td>
            <td className="border border-slate-400 px-4 py-2">
              Working together as a team and with our clients ensures the best outcomes.
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-slate-700 max-w-3xl text-center mt-6">
        Our mission is simple: to empower businesses with the tools, strategies, 
        and creativity they need to thrive in the digital age. We are committed 
        to delivering excellence and building long-term partnerships that drive 
        sustainable growth.
      </p>
    </div>
  )
}
