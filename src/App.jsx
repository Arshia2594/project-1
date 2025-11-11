
// import React, { useState } from "react";
// import Tabs from "./components/ui/Tab";


// const Page = () => {
//   const [activeTab, setActiveTab] = useState("Overview");

//   return (
//     <div>
//       <Tabs
//         tabs={["Overview", "Details", "Team", "Files"]}
//         active={activeTab}
//         onChange={setActiveTab}
//       />

//       <div className="mt-4">
//         {activeTab === "Overview" && <div>Overview content...</div>}
//         {activeTab === "Details" && <div>Details content...</div>}
//         {activeTab === "Team" && <div>Team content...</div>}
//         {activeTab === "Files" && <div>Files content...</div>}
//       </div>
//     </div>
//   );
// };

// export default Page;
import React from 'react'

import DemoPage from './Pages/DemoPage'

const App = () => {
  return (
    <div>
      <DemoPage/>
      
    </div>
  )
}

export default App
