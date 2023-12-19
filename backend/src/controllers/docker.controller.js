// services
import { listContainers } from "../services/listDockerContainers.service";

export const listDockerContainers = async (res) => {
  try {
    const containers = await listContainers();
    res.json(containers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getContainerNetworkSettings = async (req, res) => {
  const containerName = req.body.containerName; // Get container name from request body

  exec(
    `docker inspect ${containerName} -f '{{json .NetworkSettings.Networks}}'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res
          .status(500)
          .send(`Error executing command: ${error.message}`);
      }
      res.send(`Command output: ${stdout}`);
    }
  );
};
