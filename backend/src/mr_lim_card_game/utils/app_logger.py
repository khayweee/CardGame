import logging
import logging.config
import os


class Logger:
    @staticmethod
    def get_logger(name: str) -> logging.Logger:
        """Create and configure a logger instance using logger.ini."""
        config_path = os.getenv("LOGGER_CONFIG_PATH", "config/logger.ini")
        if not os.path.isabs(config_path):
            # If the path is relative, resolve it relative to the project root
            config_path = os.path.join(
                os.path.dirname(os.path.dirname(os.path.dirname(__file__))), config_path
            )
        logging.config.fileConfig(config_path, disable_existing_loggers=False)
        return logging.getLogger(name)
