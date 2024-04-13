import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Link, List, ListItem, Select } from "@chakra-ui/react";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const rows = csvData.split("\n");
      const header = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return header.reduce((obj, key, index) => {
          obj[key] = values[index];
          return obj;
        }, {});
      });

      console.log("Parsed CSV data:", data);

      const filteredData = data.filter((row) => row.type === "ai_update");
      setCsvData(filteredData);

      const uniqueProjectIds = getUniqueProjectIds();
      console.log("Unique project IDs:", uniqueProjectIds);
    };

    reader.readAsText(file);
  };

  const getUniqueProjectIds = () => {
    const projectIds = csvData.map((row) => {
      const projectId = row.path ? row.path.split("/")[0] : "";
      return projectId;
    });
    const uniqueProjectIds = [...new Set(projectIds)];
    console.log("Unique project IDs in state:", uniqueProjectIds);
    return uniqueProjectIds;
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
            {getUniqueProjectIds().map((projectId) => {
              console.log("Rendering option for project ID:", projectId);
              return (
                <option key={projectId} value={projectId}>
                  {projectId}
                </option>
              );
            })}
            <option value="">Select a project</option>
            {getUniqueProjectIds().map((projectId) => (
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
          <List spacing={3}>
            {getFilteredEdits().map((edit) => (
              <ListItem key={edit.id}>
                <strong>Edit ID:</strong> {edit.id}
                <br />
                <strong>Commit SHA:</strong> {edit.commit_sha}
                <br />
                <Link href={`https://github.com/search?q=commit%3A${edit.commit_sha}&type=commits`} target="_blank" rel="noopener noreferrer">
                  Search on GitHub
                </Link>
                <br />
                <strong>Tags Output:</strong>
                <pre>{JSON.stringify(JSON.parse(edit.tags.output), null, 2)}</pre>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Index;
