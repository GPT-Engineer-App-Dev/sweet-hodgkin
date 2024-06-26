import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Link, List, ListItem, Select } from "@chakra-ui/react";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [uniqueProjectIds, setUniqueProjectIds] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvContent = e.target.result;
      const data = parseCSV(csvContent);
      const filteredData = data.filter((row) => row.type === "ai_update");

      const uniqueProjectIds = filteredData.map((row) => {
        const parts = row.path ? row.path.split("/") : [];
        return parts.length > 1 ? parts[1] : "";
      });

      const uniqueIds = [...new Set(uniqueProjectIds)];
      console.log("Unique Project IDs:", uniqueIds);

      setCsvData(filteredData);
      setUniqueProjectIds(uniqueIds);
      console.log("Project IDs state:", uniqueIds);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvContent) => {
    const rows = csvContent.split("\n");
    const header = rows[0].split(",");
    const pathColumnIndex = header.findIndex((column) => column === "path");

    const parsedData = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");

      if (pathColumnIndex !== -1 && row[pathColumnIndex]) {
        const pathParts = row[pathColumnIndex].split("/");
        const projectId = pathParts[1] || "";

        if (!projectId) {
          continue;
        }

        console.log(`Extracted project ID: ${projectId}`);

        const rowData = header.reduce((obj, key, index) => {
          obj[key] = row[index];
          return obj;
        }, {});

        parsedData.push(rowData);
      }
    }

    return parsedData;
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const getFilteredEdits = () => {
    return csvData.filter((row) => row.path.startsWith(selectedProject));
  };

  return (
    <Box maxWidth="800px" margin="0 auto" padding="20px">
      <Heading as="h1" size="xl" marginBottom="20px">
        Internal Tool
      </Heading>

      <FormControl marginBottom="20px">
        <FormLabel>Upload CSV File</FormLabel>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
      </FormControl>

      {csvData.length > 0 && (
        <FormControl marginBottom="20px">
          <FormLabel>Select Project</FormLabel>
          <Select value={selectedProject} onChange={handleProjectChange}>
            <option value="">Select a project</option>
            {console.log("Project IDs in Select:", uniqueProjectIds)}
            {uniqueProjectIds.map((projectId) => (
              <option key={projectId} value={projectId}>
                {projectId}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedProject && (
        <Box>
          <Heading as="h2" size="lg" marginBottom="10px">
            Code Edits for Project: {selectedProject}
          </Heading>
          <table>
            <thead>
              <tr>
                <th>Edit ID</th>
                <th>Commit SHA</th>
                <th>GitHub Link</th>
                <th>Tags Output</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredEdits().map((edit) => (
                <tr key={edit.id}>
                  <td>{edit.id}</td>
                  <td>{edit.commit_sha}</td>
                  <td>
                    <Link href={`https://github.com/search?q=commit%3A${edit.commit_sha}&type=commits`} target="_blank" rel="noopener noreferrer">
                      Search on GitHub
                    </Link>
                  </td>
                  <td>
                    <pre>{edit.tags && edit.tags.output ? JSON.stringify(JSON.parse(edit.tags.output), null, 2) : "Invalid JSON"}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
};

export default Index;
