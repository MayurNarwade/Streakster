import React from 'react';
import {
  Card,
  Group,
  Text,
  Checkbox,
  Badge,
  Paper,
  Box,
  Stack,
  ActionIcon,
  Tooltip,
  Progress,
  Collapse,
} from '@mantine/core';
import { Star, AlertCircle, Check, Trash, RotateClockwise } from '@tabler/icons-react';
import { Home } from '@tabler/icons-react';

const TaskCard = React.memo(({ 
  task, 
  onToggle, 
  onDelete, 
  onDelegate,
  categories = [],
  priorities = []
}) => {
  const priorityObj = priorities.find(p => p.value === task.priority) || priorities[0];
  const categoryObj = categories.find(c => c.value === task.category) || categories[0];

  return (
    <Card
      p="md"
      mb="sm"
      sx={{
        borderLeftWidth: 4,
        borderLeftColor: priorityObj?.color || 'blue',
        opacity: task.completed ? 0.6 : 1,
        position: 'relative',
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(30, 30, 40, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Group position="apart" align="flex-start" noWrap>
        {/* Left: Task Content */}
        <Box style={{ flex: 1 }}>
          <Group spacing="sm" align="center" mb={4}>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              size="md"
              color="green"
              sx={{ '& input': { cursor: 'pointer' } }}
            />
            
            <Text
              weight={600}
              size="lg"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'dimmed' : 'inherit',
                flex: 1,
              }}
            >
              {task.title}
            </Text>
          </Group>

          {task.summary && (
            <Text size="sm" color="dimmed" mb="md">
              {task.summary}
            </Text>
          )}

          {/* Task Metadata */}
          <Group spacing="xs" mb="xs">
            <Badge
              size="sm"
              variant="filled"
              color={priorityObj?.color}
              leftSection={<Star size={12} />}
            >
              {priorityObj?.label}
            </Badge>
            
            <Badge
              size="sm"
              variant="outline"
              color={categoryObj?.color}
              leftSection={<Home size={12} />}
            >
              {categoryObj?.label}
            </Badge>
          </Group>

          {/* AI Insights */}
          {task.aiNotes && (
            <Collapse in={!task.completed}>
              <Paper p="xs" mt="xs" sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <Group spacing={4}>
                  <AlertCircle size={14} />
                  <Text size="xs" color="dimmed">
                    {task.aiNotes}
                  </Text>
                </Group>
              </Paper>
            </Collapse>
          )}
        </Box>

        {/* Right: Actions & Indicators */}
        <Stack spacing="xs" align="flex-end">
          {/* Energy Required Indicator */}
          <Tooltip label={`Energy Required: ${task.energyRequired || 50}/100`}>
            <Box>
              <Progress
                value={task.energyRequired || 50}
                size="sm"
                sx={{ width: 60 }}
                color={(task.energyRequired || 50) > 70 ? 'red' : (task.energyRequired || 50) > 40 ? 'yellow' : 'green'}
              />
            </Box>
          </Tooltip>

          {/* Action Buttons */}
          <Group spacing={2}>
            <Tooltip label="Delegate to AI">
              <ActionIcon
                color="blue"
                variant="subtle"
                onClick={() => onDelegate(task.id)}
              >
                <AlertCircle size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label={task.completed ? "Mark Pending" : "Mark Complete"}>
              <ActionIcon
                color={task.completed ? "yellow" : "green"}
                variant="subtle"
                onClick={() => onToggle(task.id)}
              >
                {task.completed ? <RotateClockwise size={16} /> : <Check size={16} />}
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Delete">
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => onDelete(task.id)}
              >
                <Trash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
});

export default TaskCard;